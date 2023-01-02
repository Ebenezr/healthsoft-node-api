import { NextFunction, Request, Response, Router } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // retrieve user from the database
      const user = await prisma.doctor
        .findOne({ where: { email } })
        .union(prisma.nurse.findOne({ where: { email } }))
        .union(prisma.admin.findOne({ where: { email } }));
      if (!user) {
        throw new Error("User not found");
      }

      // check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }

      // generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

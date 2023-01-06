import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AnyZodObject } from "zod";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const router = Router();

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

router.post(
  "/login",
  validate(loginUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // query the appropriate table based on the user's role
      let user;
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (admin) {
        user = admin;
      } else {
        const doctor = await prisma.doctor.findUnique({ where: { email } });
        if (doctor) {
          user = doctor;
        } else {
          const nurse = await prisma.nurse.findUnique({ where: { email } });
          if (nurse) {
            user = nurse;
          }
        }
      }
      if (!user) {
        // return an error if
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      //   if (!user) {
      //     throw new Error("Invalid email or password");
      //   }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
        // throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

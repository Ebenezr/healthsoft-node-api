import { createUserSchema } from "./../schemas/user.schema";
import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AnyZodObject } from "zod";
const bcrypt = require("bcryptjs");

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

// ROUTES
// create new admin
router.post(
  "/admins",
  validate(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check if there is already an admin with the same email address
      const existingAdmin = await prisma.admin.findUnique({
        where: { email: req.body.email },
      });
      if (existingAdmin) {
        // return an error if the email is already in use
        return res
          .status(400)
          .json({ success: false, error: "Email already in use" });
      }
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await prisma.admin.create({
        data: { ...req.body, password: hashedPassword },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a admin
router.delete(
  `/admin/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.admin.delete({
        where: { id: Number(id) },
      });
      res.json({
        success: true,
        payload: song,
      });
    } catch (error) {
      next(error);
    }
  }
);

// update admins
router.patch(
  "/admin/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await prisma.admin.update({
        where: { id: Number(id) },
        data: { ...req.body, password: hashedPassword },
      });
      res.json({
        success: true,
        payload: admin,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all admins
router.get(
  "/admins",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admins = await prisma.admin.findMany();
      const adminWithFullName = admins.map((admin) => {
        return {
          ...admins,
          fullName: `${admin?.firstName} ${admin?.lastName}`,
        };
      });
      res.json({
        success: true,
        payload: admins,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single admins
router.get(
  "/admin/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          id: Number(id),
        },
      });

      // create a new admin object with a fullName field
      const adminWithFullName = {
        ...admin,
        fullName: `${admin?.firstName} ${admin?.lastName}`,
      };

      const payload = {
        patient: adminWithFullName,
      };
      res.json({
        success: true,
        payload: adminWithFullName,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

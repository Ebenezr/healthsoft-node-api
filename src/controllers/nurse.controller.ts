import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AnyZodObject } from "zod";
import { createUserSchema } from "../schemas/user.schema";
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
// create new nurse
router.post(
  "/nurses",
  validate(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check if there is already an admin with the same email address
      const existingNurse = await prisma.admin.findUnique({
        where: { email: req.body.email },
      });

      if (existingNurse) {
        // return an error if the email is already in use
        return res
          .status(400)
          .json({ success: false, error: "Email already in use" });
      }
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await prisma.nurse.create({
        data: { ...req.body, password: hashedPassword },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a nurse
router.delete(
  `/nurse/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.nurse.delete({
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

// update nurses
router.patch(
  "/nurse/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const nurse = await prisma.nurse.update({
        where: { id: Number(id) },
        data: { ...req.body, password: hashedPassword },
      });
      res.json({
        success: true,
        payload: nurse,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all nurses
router.get(
  "/nurses",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nurses = await prisma.nurse.findMany();
      const nurseWithFullName = nurses.map((nurse) => {
        return {
          ...nurses,
          fullName: `${nurse?.firstName} ${nurse?.lastName}`,
        };
      });
      res.json({
        success: true,
        payload: nurses,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single nurses
router.get(
  "/nurse/:id",

  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const nurse = await prisma.nurse.findUnique({
        where: {
          id: Number(id),
        },
      });

      // create a new nurse object with a fullName field
      const nurseWithFullName = {
        ...nurse,
        fullName: `${nurse?.firstName} ${nurse?.lastName}`,
      };

      const payload = {
        patient: nurseWithFullName,
      };
      res.json({
        success: true,
        payload: nurseWithFullName,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/user.schema";
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

// create new doctor
router.post(
  "/doctors",
  validate(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await prisma.doctor.create({
        data: { ...req.body, password: hashedPassword },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a doctor
router.delete(
  `/doctor/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.doctor.delete({
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

// update doctors
router.patch(
  "/doctor/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const doctor = await prisma.doctor.update({
        where: { id: Number(id) },
        data: { ...req.body, password: hashedPassword },
      });
      res.json({
        success: true,
        payload: doctor,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all doctors
router.get(
  "/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctor.findMany();
      const doctorWithFullName = doctors.map((doctor) => {
        return {
          ...doctors,
          fullName: `${doctor.firstName} ${doctor.lastName}`,
        };
      });
      res.json({
        success: true,
        payload: doctors,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single doctors
router.get(
  "/doctor/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const doctor = await prisma.doctor.findUnique({
        where: {
          id: Number(id),
        },
      });
      // create a new doctor object with a fullName field
      const doctorWithFullName = {
        ...doctor,
        fullName: `${doctor?.firstName} ${doctor?.lastName}`,
      };

      const payload = {
        patient: doctorWithFullName,
      };
      res.json({
        success: true,
        payload: doctorWithFullName,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new doctor
router.post(
  "/doctors",
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
  "/doctors/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const doctors = await prisma.doctor.findUnique({
        where: {
          id: Number(id),
        },
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

export default router;

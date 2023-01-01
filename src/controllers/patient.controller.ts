import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new patient
router.post(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.patient.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a patient
router.delete(
  `/patient/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.patient.delete({
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

// update patients
router.patch(
  "/patient/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const patient = await prisma.patient.update({
        where: { id: Number(id) },
        data: { ...req.body },
      });
      res.json({
        success: true,
        payload: patient,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all patients
router.get(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await prisma.patient.findMany();
      res.json({
        success: true,
        payload: patients,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single patients
router.get(
  "/patients/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const patients = await prisma.patient.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json({
        success: true,
        payload: patients,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

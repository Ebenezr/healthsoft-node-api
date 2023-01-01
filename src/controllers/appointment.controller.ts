import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new appointment
router.post(
  "/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.appointment.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a appointment
router.delete(
  `/appointment/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.appointment.delete({
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

// update appointments
router.patch(
  "/appointment/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const appointment = await prisma.appointment.update({
        where: { id: Number(id) },
        data: { ...req.body },
      });
      res.json({
        success: true,
        payload: appointment,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all appointments
router.get(
  "/appointments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointments = await prisma.appointment.findMany();
      res.json({
        success: true,
        payload: appointments,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single appointments
router.get(
  "/appointments/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const appointments = await prisma.appointment.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json({
        success: true,
        payload: appointments,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

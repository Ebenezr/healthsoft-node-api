import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new vital
router.post(
  "/vitals",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.vitals.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a vital
router.delete(
  `/vital/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.vitals.delete({
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

// update vitals
router.patch(
  "/vital/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const vital = await prisma.vitals.update({
        where: { id: Number(id) },
        data: { ...req.body },
      });
      res.json({
        success: true,
        payload: vital,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all vitals
router.get(
  "/vitals",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vitals = await prisma.vitals.findMany();
      res.json({
        success: true,
        payload: vitals,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single vitals
router.get(
  "/vitals/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const vitals = await prisma.vitals.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json({
        success: true,
        payload: vitals,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

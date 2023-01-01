import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new checkup
router.post(
  "/checkups",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.checkup.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a checkup
router.delete(
  `/checkup/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.checkup.delete({
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

// update checkups
router.patch(
  "/checkup/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const checkup = await prisma.checkup.update({
        where: { id: Number(id) },
        data: { ...req.body },
      });
      res.json({
        success: true,
        payload: checkup,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all checkups
router.get(
  "/checkups",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkups = await prisma.checkup.findMany();
      res.json({
        success: true,
        payload: checkups,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single checkups
router.get(
  "/checkups/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const checkups = await prisma.checkup.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.json({
        success: true,
        payload: checkups,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

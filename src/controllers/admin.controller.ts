import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { nextTick } from "process";

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new admin
router.post(
  "/admins",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.admin.create({
        data: { ...req.body },
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
      const admin = await prisma.admin.update({
        where: { id: Number(id) },
        data: { ...req.body },
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
  "/admins/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const admins = await prisma.admin.findUnique({
        where: {
          id: Number(id),
        },
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

export default router;

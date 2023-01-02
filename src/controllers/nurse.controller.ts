import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const router = Router();

// ROUTES
// create new nurse
router.post(
  "/nurses",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      const nurses = await prisma.nurse.findUnique({
        where: {
          id: Number(id),
        },
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

export default router;

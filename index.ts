import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const express = require("express");
const app = express();

app.use(express.json());

const prisma = new PrismaClient();

// ROUTES
// create new doctor
app.post("/doctors", async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });

  res.json({ success: true, payload: result });
});
// create new nurse
app.post("/nurses", async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });

  res.json({ success: true, payload: result });
});
// create new admin
app.post("/admins", async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });

  res.json({ success: true, payload: result });
});

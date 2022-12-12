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
// delete a doctor
app.delete(`/doctor/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  const song = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    payload: song,
  });
});
// fetch all doctors
app.get("/doctors", async (req: Request, res: Response) => {
  const doctors = await prisma.user.findMany();
  res.json({
    success: true,
    payload: doctors,
  });
});
// update doctors
app.put("/doctor/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctor = await prisma.user.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });
  res.json({
    success: true,
    payload: doctor,
  });
});

app.use((req: Request, res: Response, next: any) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());

const prisma = new PrismaClient();

// load enviroment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "API is running on /api" });
});

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);

// ROUTES
// create new doctor
app.post(
  "/doctors",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.doctor.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a doctor
app.delete(
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
app.patch(
  "/doctor/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const doctor = await prisma.doctor.update({
        where: { id: Number(id) },
        data: { ...req.body },
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
app.get("/doctors", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json({
      success: true,
      payload: doctors,
    });
  } catch (error) {
    next(error);
  }
});

// fetch single doctors
app.get(
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

// curl -X POST -H "Content-Type: application/json" -d '{
//     "firstName": "Emmanuel",
//     "lastName": "Baraka",
//     "phone": "0715452415",
//     "email" :"emmanuel@gmail.com",
//     "password": "emmanuel",
//     "designation": "Clinical Officer",
//     "role": "DOCTOR",
//     "gender": "male"

// }' http://localhost:3001/doctors

// create new nurse
// app.post("/nurses", async (req: Request, res: Response) => {
//   const result = await prisma.nurse.create({
//     data: { ...req.body },
//   });

//   res.json({ success: true, payload: result });
// });
// // create new admin
// app.post("/admins", async (req: Request, res: Response) => {
//   const result = await prisma.admin.create({
//     data: { ...req.body },
//   });

//   res.json({ success: true, payload: result });
// });

// fetch all doctors
// app.get("/doctors", async (req: Request, res: Response) => {
//   const doctors = await prisma.doctor.findMany();
//   res.json({
//     success: true,
//     payload: doctors,
//   });
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

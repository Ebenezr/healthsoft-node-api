import { Request, Response, NextFunction } from "express";
// import routes
import adminRouter from "./controllers/admin.controller";
import doctorRouter from "./controllers/doctor.controller";
import nurseRouter from "./controllers/nurse.controller";
import patientRouter from "./controllers/patient.controller";
import vitalRouter from "./controllers/vital.controller";
import checkupRouter from "./controllers/checkup.controller";
import appointmentRouter from "./controllers/appointment.controller";
import authRouter from "./controllers/auth.controller";

const responseTime = require("response-time");
const dotenv = require("dotenv");
const cors = require("cors");

// handle bigint

const express = require("express");
const app = express();
app.use(responseTime());
// setup cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());

// load enviroment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "API is running on /api" });
});

// routes
app.use("/api", adminRouter);
app.use("/api", doctorRouter);
app.use("/api", nurseRouter);
app.use("/api", patientRouter);
app.use("/api", appointmentRouter);
app.use("/api", checkupRouter);
app.use("/api", vitalRouter);
app.use("/api", authRouter);

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

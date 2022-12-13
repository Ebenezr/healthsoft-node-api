import { Router } from "express";
import doctorController from "../controllers/doctor.controller";

const api = Router().use(doctorController);

export default Router().use("/api", api);

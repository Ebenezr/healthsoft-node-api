import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AnyZodObject } from "zod";
import { createPatientSchema } from "../schemas/patient.schema";

const prisma = new PrismaClient();
const router = Router();

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

// ROUTES
// create new patient
router.post(
  "/patients",
  validate(createPatientSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.patient.create({
        data: { ...req.body },
      });

      res.json({ success: true, payload: result });
    } catch (error) {
      next(error);
    }
  }
);

// delete a patient
router.delete(
  `/patient/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const song = await prisma.patient.delete({
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

// update patients
router.patch(
  "/patient/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const patient = await prisma.patient.update({
        where: { id: Number(id) },
        data: { ...req.body },
      });
      res.json({
        success: true,
        payload: patient,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch all patients
router.get(
  "/patients",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await prisma.patient.findMany();
      // map over the patients array and create a new array of patient objects
      // with a fullName field
      const patientsWithFullName = patients.map((patient) => {
        return {
          ...patient,
          fullName: `${patient.firstName} ${patient.lastName}`,
        };
      });

      res.json({
        success: true,
        payload: patientsWithFullName,
      });
    } catch (error) {
      next(error);
    }
  }
);

// fetch single patients
router.get(
  "/patients/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const patient = await prisma.patient.findUnique({
        where: {
          id: Number(id),
        },
      });
      // create a new patient object with a fullName field
      const patientWithFullName = {
        ...patient,
        fullName: `${patient?.firstName} ${patient?.lastName}`,
      };
      // add the fullName field to the payload object
      const payload = {
        patient: patientWithFullName,
      };

      res.json({
        success: true,
        payload: payload,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

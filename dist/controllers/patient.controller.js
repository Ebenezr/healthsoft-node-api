"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const patient_schema_1 = require("../schemas/patient.schema");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
// ROUTES
// create new patient
router.post("/patients", validate(patient_schema_1.createPatientSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.patient.create({
            data: Object.assign({}, req.body),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a patient
router.delete(`/patient/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.patient.delete({
            where: { id: Number(id) },
        });
        res.json({
            success: true,
            payload: song,
        });
    }
    catch (error) {
        next(error);
    }
}));
// update patients
router.patch("/patient/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield prisma.patient.update({
            where: { id: Number(id) },
            data: Object.assign({}, req.body),
        });
        res.json({
            success: true,
            payload: patient,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all patients
router.get("/patients", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield prisma.patient.findMany();
        // map over the patients array and create a new array of patient objects
        // with a fullName field
        const patientsWithFullName = patients.map((patient) => {
            return Object.assign(Object.assign({}, patient), { fullName: `${patient.firstName} ${patient.lastName}` });
        });
        res.json({
            success: true,
            payload: patientsWithFullName,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single patients
router.get("/patients/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield prisma.patient.findUnique({
            where: {
                id: Number(id),
            },
        });
        // create a new patient object with a fullName field
        const patientWithFullName = Object.assign(Object.assign({}, patient), { fullName: `${patient === null || patient === void 0 ? void 0 : patient.firstName} ${patient === null || patient === void 0 ? void 0 : patient.lastName}` });
        // add the fullName field to the payload object
        const payload = {
            patient: patientWithFullName,
        };
        res.json({
            success: true,
            payload: payload,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

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
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = require("bcryptjs");
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
// create new doctor
router.post("/doctors", validate(user_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if there is already an admin with the same email address
        const email = req.body.email;
        const existingDoctor = yield prisma.doctor.findUnique({
            where: { email: email },
        });
        if (existingDoctor) {
            // return an error if the email is already in use
            return res
                .status(400)
                .json({ success: false, error: "Email already in use" });
        }
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const result = yield prisma.doctor.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a doctor
router.delete(`/doctor/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.doctor.delete({
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
// update doctors
router.patch("/doctor/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const doctor = yield prisma.doctor.update({
            where: { id: Number(id) },
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({
            success: true,
            payload: doctor,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all doctors
router.get("/doctors", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield prisma.doctor.findMany();
        const doctorWithFullName = doctors.map((doctor) => {
            return Object.assign(Object.assign({}, doctors), { fullName: `${doctor.firstName} ${doctor.lastName}` });
        });
        res.json({
            success: true,
            payload: doctors,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single doctors
router.get("/doctor/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield prisma.doctor.findUnique({
            where: {
                id: Number(id),
            },
        });
        // create a new doctor object with a fullName field
        const doctorWithFullName = Object.assign(Object.assign({}, doctor), { fullName: `${doctor === null || doctor === void 0 ? void 0 : doctor.firstName} ${doctor === null || doctor === void 0 ? void 0 : doctor.lastName}` });
        const payload = {
            patient: doctorWithFullName,
        };
        res.json({
            success: true,
            payload: doctorWithFullName,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

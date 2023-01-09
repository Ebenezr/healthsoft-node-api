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
// create new nurse
router.post("/nurses", validate(user_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if there is already an admin with the same email address
        const email = req.body.email;
        const existingNurse = yield prisma.nurse.findUniqueOrThrow({
            where: { email: email },
        });
        if (existingNurse) {
            // return an error if the email is already in use
            return res
                .status(400)
                .json({ success: false, error: "Email already in use" });
        }
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const result = yield prisma.nurse.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a nurse
router.delete(`/nurse/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.nurse.delete({
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
// update nurses
router.patch("/nurse/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const nurse = yield prisma.nurse.update({
            where: { id: Number(id) },
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({
            success: true,
            payload: nurse,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all nurses
router.get("/nurses", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nurses = yield prisma.nurse.findMany();
        const nurseWithFullName = nurses.map((nurse) => {
            return Object.assign(Object.assign({}, nurses), { fullName: `${nurse === null || nurse === void 0 ? void 0 : nurse.firstName} ${nurse === null || nurse === void 0 ? void 0 : nurse.lastName}` });
        });
        res.json({
            success: true,
            payload: nurses,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single nurses
router.get("/nurse/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nurse = yield prisma.nurse.findUnique({
            where: {
                id: Number(id),
            },
        });
        // create a new nurse object with a fullName field
        const nurseWithFullName = Object.assign(Object.assign({}, nurse), { fullName: `${nurse === null || nurse === void 0 ? void 0 : nurse.firstName} ${nurse === null || nurse === void 0 ? void 0 : nurse.lastName}` });
        const payload = {
            patient: nurseWithFullName,
        };
        res.json({
            success: true,
            payload: nurseWithFullName,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

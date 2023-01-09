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
const user_schema_1 = require("./../schemas/user.schema");
const express_1 = require("express");
const client_1 = require("@prisma/client");
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
// create new admin
router.post("/admins", validate(user_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if there is already an admin with the same email address
        const existingAdmin = yield prisma.admin.findUnique({
            where: { email: req.body.email },
        });
        if (existingAdmin) {
            // return an error if the email is already in use
            return res
                .status(400)
                .json({ success: false, error: "Email already in use" });
        }
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const result = yield prisma.admin.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a admin
router.delete(`/admin/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.admin.delete({
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
// update admins
router.patch("/admin/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const password = req.body.password;
        const hashedPassword = yield bcrypt.hash(password, 10);
        const admin = yield prisma.admin.update({
            where: { id: Number(id) },
            data: Object.assign(Object.assign({}, req.body), { password: hashedPassword }),
        });
        res.json({
            success: true,
            payload: admin,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all admins
router.get("/admins", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield prisma.admin.findMany();
        const adminWithFullName = admins.map((admin) => {
            return Object.assign(Object.assign({}, admins), { fullName: `${admin === null || admin === void 0 ? void 0 : admin.firstName} ${admin === null || admin === void 0 ? void 0 : admin.lastName}` });
        });
        res.json({
            success: true,
            payload: admins,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single admins
router.get("/admin/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });
        // create a new admin object with a fullName field
        const adminWithFullName = Object.assign(Object.assign({}, admin), { fullName: `${admin === null || admin === void 0 ? void 0 : admin.firstName} ${admin === null || admin === void 0 ? void 0 : admin.lastName}` });
        const payload = {
            patient: adminWithFullName,
        };
        res.json({
            success: true,
            payload: adminWithFullName,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

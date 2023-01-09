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
const jwt = require("jsonwebtoken");
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
router.post("/login", validate(user_schema_1.loginUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // query the appropriate table based on the user's role
        let user;
        const admin = yield prisma.admin.findUnique({ where: { email } });
        if (admin) {
            user = admin;
        }
        else {
            const doctor = yield prisma.doctor.findUnique({ where: { email } });
            if (doctor) {
                user = doctor;
            }
            else {
                const nurse = yield prisma.nurse.findUnique({ where: { email } });
                if (nurse) {
                    user = nurse;
                }
            }
        }
        if (!user) {
            // return an error if
            return res
                .status(400)
                .json({ success: false, error: "Invalid email or password" });
        }
        //   if (!user) {
        //     throw new Error("Invalid email or password");
        //   }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid email or password" });
            // throw new Error("Invalid email or password");
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            success: true,
            token,
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

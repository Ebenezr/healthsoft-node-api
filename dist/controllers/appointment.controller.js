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
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// ROUTES
// create new appointment
router.post("/appointments", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.appointment.create({
            data: Object.assign({}, req.body),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a appointment
router.delete(`/appointment/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.appointment.delete({
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
// update appointments
router.patch("/appointment/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield prisma.appointment.update({
            where: { id: Number(id) },
            data: Object.assign({}, req.body),
        });
        res.json({
            success: true,
            payload: appointment,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all appointments
router.get("/appointments", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield prisma.appointment.findMany();
        res.json({
            success: true,
            payload: appointments,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single appointments
router.get("/appointments/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointments = yield prisma.appointment.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json({
            success: true,
            payload: appointments,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

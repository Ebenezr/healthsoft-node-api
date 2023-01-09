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
// create new vital
router.post("/vitals", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.vitals.create({
            data: Object.assign({}, req.body),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a vital
router.delete(`/vital/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.vitals.delete({
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
// update vitals
router.patch("/vital/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vital = yield prisma.vitals.update({
            where: { id: Number(id) },
            data: Object.assign({}, req.body),
        });
        res.json({
            success: true,
            payload: vital,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all vitals
router.get("/vitals", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vitals = yield prisma.vitals.findMany({
            include: { patient: true },
        });
        res.json({
            success: true,
            payload: vitals,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single vitals
router.get("/vitals/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vitals = yield prisma.vitals.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        res.json({
            success: true,
            payload: vitals,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

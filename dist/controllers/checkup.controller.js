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
// create new checkup
router.post("/checkups", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.checkup.create({
            data: Object.assign({}, req.body),
        });
        res.json({ success: true, payload: result });
    }
    catch (error) {
        next(error);
    }
}));
// delete a checkup
router.delete(`/checkup/:id`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield prisma.checkup.delete({
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
// update checkups
router.patch("/checkup/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkup = yield prisma.checkup.update({
            where: { id: Number(id) },
            data: Object.assign({}, req.body),
        });
        res.json({
            success: true,
            payload: checkup,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch all checkups
router.get("/checkups", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkups = yield prisma.checkup.findMany();
        res.json({
            success: true,
            payload: checkups,
        });
    }
    catch (error) {
        next(error);
    }
}));
// fetch single checkups
router.get("/checkups/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const checkups = yield prisma.checkup.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json({
            success: true,
            payload: checkups,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

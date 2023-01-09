"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import routes
const admin_controller_1 = __importDefault(require("./controllers/admin.controller"));
const doctor_controller_1 = __importDefault(require("./controllers/doctor.controller"));
const nurse_controller_1 = __importDefault(require("./controllers/nurse.controller"));
const patient_controller_1 = __importDefault(require("./controllers/patient.controller"));
const vital_controller_1 = __importDefault(require("./controllers/vital.controller"));
const checkup_controller_1 = __importDefault(require("./controllers/checkup.controller"));
const appointment_controller_1 = __importDefault(require("./controllers/appointment.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const dotenv = require("dotenv");
const cors = require("cors");
// handle bigint
const express = require("express");
const app = express();
// setup cors
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app.use(express.json());
// load enviroment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.json({ status: "API is running on /api" });
});
// routes
app.use("/api/v1", admin_controller_1.default);
app.use("/api/v1", doctor_controller_1.default);
app.use("/api/v1", nurse_controller_1.default);
app.use("/api/v1", patient_controller_1.default);
app.use("/api/v1", appointment_controller_1.default);
app.use("/api/v1", checkup_controller_1.default);
app.use("/api/v1", vital_controller_1.default);
app.use("/api/v1", auth_controller_1.default);
app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});

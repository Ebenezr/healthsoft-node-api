"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientSchema = void 0;
const zod_1 = require("zod");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (Gender = {}));
// enum PatientType {
//   INPATIENT = " INPATIENT",
//   OUTPATIENT = "OUTPATIENT",
// }
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (MaritalStatus = {}));
exports.createPatientSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        gender: zod_1.z.optional(zod_1.z.nativeEnum(Gender)),
        maritalStatus: zod_1.z.optional(zod_1.z.nativeEnum(MaritalStatus)),
    }),
});

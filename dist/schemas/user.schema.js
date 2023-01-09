"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["NURSE"] = "NURSE";
    Role["DOCTOR"] = "DOCTOR";
})(Role || (Role = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (Gender = {}));
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email address is required",
        }).email("Invalid email address"),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        })
            .min(6, "Password must be more than 6 characters")
            .max(32, "Password must be less than 32 characters"),
        // passwordConfirm: string({
        //   required_error: "Please confirm your password",
        // }),
        role: zod_1.z.optional(zod_1.z.nativeEnum(Role)),
        gender: zod_1.z.optional(zod_1.z.nativeEnum(Gender)),
    }),
    // .refine((data) => data.password === data.passwordConfirm, {
    //     path: ["passwordConfirm"],
    //     message: "Passwords do not match",
    //   }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email address is required",
        }).email("Invalid email address"),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(8, "Invalid email or password"),
    }),
});

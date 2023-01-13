import { object, string, TypeOf, z } from "zod";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export const createPatientSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    gender: z.optional(z.nativeEnum(Gender)),
    maritalStatus: z.optional(z.nativeEnum(MaritalStatus)),
  }),
});

export type createPatientSchema = TypeOf<typeof createPatientSchema>["body"];

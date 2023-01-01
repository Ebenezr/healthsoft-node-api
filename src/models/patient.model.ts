import { Appointment } from "./appointment.model";
import { Checkup } from "./checkup.model";
import { Vitals } from "./patientVitals.model";

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dob?: Date;
  maritalStatus?: string;
  nationalId?: number;
  address?: string;
  county?: string;
  estate?: string;
  phone?: string;
  email: string;
  gender?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Appointment?: Appointment[];
  Checkup?: Checkup[];
  Vitals?: Vitals;
  image?: string | null;
}

import { Appointment } from "./appointment.model";
import { Checkup } from "./checkup.model";

export interface Doctor {
  id: number;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  password?: string;
  gender?: string;
  designation?: string;
  role: string;
  Appointment?: Appointment[];
  Checkup?: Checkup[];
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

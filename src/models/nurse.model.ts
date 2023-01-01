import { Appointment } from "./appointment.model";

export interface Nurse {
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
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

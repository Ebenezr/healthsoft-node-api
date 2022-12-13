export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  designation: string;
  role: string;
  //   createdAt: Datetime;
  //   updatedAt: datetime;
  //   Appointment: Appointment[];
  //   Checkup: Checkup[];
  image?: string | null;
}

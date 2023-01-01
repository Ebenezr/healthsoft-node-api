export interface Admin {
  id: number;
  firstName: string;
  lastName?: string;
  phone?: string;
  email: string;
  password?: string;
  gender?: string;
  designation?: string;
  role: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

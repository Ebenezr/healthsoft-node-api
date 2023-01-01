export interface Vitals {
  id: number;
  patientID: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  temperature?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

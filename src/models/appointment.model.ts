export interface Appointment {
  id: number;
  patientType?: string;
  //   patient   :
  patientID: number;
  //   doctor    :
  doctorID: number;
  //   nurse     :
  nurseID?: number;
  appointmentdate?: Date;
  appointmentTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

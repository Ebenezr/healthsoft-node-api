export interface Checkup {
  id: number;
  //   patient   :
  patientID: number;
  //   doctor    :
  doctorID: number;
  //   nurse     :
  symptoms?: string;
  diagnosis?: string;
  advice?: string;
  comment?: string;
  HPI?: string;
  examinations?: string;
  checkupDate?: Date;
  nextVisit?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

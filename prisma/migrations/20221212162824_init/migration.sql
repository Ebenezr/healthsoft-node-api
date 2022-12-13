-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorID_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_nurseID_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientID_fkey";

-- DropForeignKey
ALTER TABLE "Checkup" DROP CONSTRAINT "Checkup_doctorID_fkey";

-- DropForeignKey
ALTER TABLE "Checkup" DROP CONSTRAINT "Checkup_patientID_fkey";

-- DropForeignKey
ALTER TABLE "Vitals" DROP CONSTRAINT "Vitals_patientID_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg';

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg';

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg';

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_nurseID_fkey" FOREIGN KEY ("nurseID") REFERENCES "Nurse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkup" ADD CONSTRAINT "Checkup_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkup" ADD CONSTRAINT "Checkup_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

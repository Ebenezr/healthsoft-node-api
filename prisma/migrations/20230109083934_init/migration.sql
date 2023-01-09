-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "PatientType" AS ENUM ('INPATIENT', 'OUTPATIENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'NURSE', 'ADMIN');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "designation" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nurses" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "designation" TEXT,
    "role" "Role" NOT NULL DEFAULT 'NURSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "verificationCode" TEXT,
    "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg',

    CONSTRAINT "nurses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "designation" TEXT,
    "role" "Role" NOT NULL DEFAULT 'DOCTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "verificationCode" TEXT,
    "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg',

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "dob" TEXT NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" VARCHAR(255),
    "county" VARCHAR(255),
    "estate" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vitals" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "bpSystolic" INTEGER NOT NULL,
    "bpDiastolic" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "notes" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "patientType" "PatientType" NOT NULL,
    "patientID" INTEGER NOT NULL,
    "doctorID" INTEGER NOT NULL,
    "nurseID" INTEGER NOT NULL,
    "appointmentdate" TIMESTAMP(3) NOT NULL,
    "appointmentTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkups" (
    "id" SERIAL NOT NULL,
    "patientID" INTEGER NOT NULL,
    "doctorID" INTEGER NOT NULL,
    "symptoms" VARCHAR(255),
    "diagnosis" VARCHAR(255),
    "advice" VARCHAR(255),
    "comment" VARCHAR(255),
    "HPI" VARCHAR(255),
    "examinations" VARCHAR(255),
    "checkupDate" TIMESTAMP(3) NOT NULL,
    "nextVisit" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nurses_email_key" ON "nurses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nurses_verificationCode_key" ON "nurses"("verificationCode");

-- CreateIndex
CREATE INDEX "nurses_email_verificationCode_idx" ON "nurses"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "nurses_email_verificationCode_key" ON "nurses"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_verificationCode_key" ON "doctors"("verificationCode");

-- CreateIndex
CREATE INDEX "doctors_email_verificationCode_idx" ON "doctors"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_verificationCode_key" ON "doctors"("email", "verificationCode");

-- CreateIndex
CREATE INDEX "patients_email_idx" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vitals_patientID_key" ON "vitals"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_patientID_key" ON "appointments"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_doctorID_key" ON "appointments"("doctorID");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_nurseID_key" ON "appointments"("nurseID");

-- CreateIndex
CREATE UNIQUE INDEX "checkups_patientID_key" ON "checkups"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "checkups_doctorID_key" ON "checkups"("doctorID");

-- AddForeignKey
ALTER TABLE "vitals" ADD CONSTRAINT "vitals_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_nurseID_fkey" FOREIGN KEY ("nurseID") REFERENCES "nurses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkups" ADD CONSTRAINT "checkups_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkups" ADD CONSTRAINT "checkups_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

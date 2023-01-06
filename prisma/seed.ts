const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const _ = require("lodash");
const uuid = require("uuid");

// generate patient
function generatePatient() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: _.sample(["MALE", "FEMALE", "OTHER"]),
    dob: faker.date.past(50).toISOString(),
    maritalStatus: _.sample(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
    nationalId: uuid.v4(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    county: faker.address.county(),
    estate: faker.address.streetName(),
  };
}

// generate vitals
function generateVitals() {
  return {
    bpSystolic: faker.datatype.number({ min: 90, max: 180 }),
    bpDiastolic: faker.datatype.number({ min: 60, max: 90 }),
    temperature: faker.datatype.number({ min: 34, max: 37 }),
    notes: faker.lorem.sentence(),
  };
}

function generateAppointment() {
  return {
    patientType: _.sample(["INPATIENT", "OUTPATIENT"]),
    appointmentdate: faker.date.future().toISOString(),
    appointmentTime: faker.date.future().toISOString(),
  };
}

async function seedPatients(numPatients: number) {
  for (let i = 0; i < numPatients; i++) {
    const patient = generatePatient();
    await prisma.patient.create({
      data: patient,
    });
    console.log(`Created patient: ${patient.firstName} ${patient.lastName}`);
  }
}
async function seedVitals(numPatients: number) {
  const patients = await prisma.patient.findMany();
  for (let i = 0; i < numPatients; i++) {
    const vitals = generateVitals();
    await prisma.vitals.create({
      data: {
        ...vitals,
        patient: {
          connect: {
            id: patients[i].id,
          },
        },
      },
    });
    console.log(
      `Created vitals for patient: ${patients[i].firstName} ${patients[i].lastName}`
    );
  }
}

async function createAppointment(
  patientId: number,
  doctorId: number,
  nurseId: number
) {
  const appointment = generateAppointment();
  await prisma.appointment.create({
    data: {
      ...appointment,
      patient: {
        connect: {
          id: patientId,
        },
      },
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      nurse: {
        connect: {
          id: nurseId,
        },
      },
    },
  });
  console.log(
    `Created appointment for patient with ID ${patientId} and doctor with ID ${doctorId}`
  );
}

async function seed() {
  await prisma.admin.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "admin1@admin.com",
      password: bcrypt.hashSync("admin1@admin.com", 8),
      gender: "MALE",
      designation: "CEO",
      role: "ADMIN",
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    },
  });

  await prisma.doctor.create({
    data: {
      firstName: "Emmanuel",
      lastName: "Bah",
      phone: "123-458-7890",
      email: "emmanuel@doctor.com",
      password: bcrypt.hashSync("emmanuel@doctor.com", 8),
      gender: "MALE",
      designation: "Surgion",
      role: "DOCTOR",
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    },
  });

  await prisma.nurse.create({
    data: {
      firstName: "Grace",
      lastName: "Makena",
      phone: "123-788-7890",
      email: "grace@nurse.com",
      password: bcrypt.hashSync("grace@nurse.com", 8),
      gender: "FEMALE",
      designation: "Front Desk",
      role: "NURSE",
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    },
  });

  await seedPatients(10);
  await seedVitals(10);
  await createAppointment(1, 5, 5);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const faker = require("faker");

// generate patient
function generatePatient() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: faker.random.arrayElement(["Male", "Female"]),
    dob: faker.date.past(50).toISOString(),
    maritalStatus: faker.random.arrayElement(["Single", "Married", "Divorced"]),
    nationalId: faker.random.uuid(),
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
    bpSystolic: faker.random.number({ min: 90, max: 180 }),
    bpDiastolic: faker.random.number({ min: 60, max: 90 }),
    temperature: faker.random.number({ min: 95, max: 105 }),
    notes: faker.lorem.sentence(),
  };
}

async function seedVitals(numPatients) {
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

async function seedPatients(numPatients) {
  for (let i = 0; i < numPatients; i++) {
    const patient = generatePatient();
    await prisma.patient.create({
      data: patient,
    });
    console.log(`Created patient: ${patient.firstName} ${patient.lastName}`);
  }
}

async function createAdmin(data) {
  // function code goes here
}

async function seed() {
  await prisma.admin.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin@admin.com", 8),
      gender: "Male",
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
      gender: "Male",
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
      gender: "Female",
      designation: "Front Desk",
      role: "NURSE",
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    },
  });

  await seedPatients(10);
  await seedVitals(10);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

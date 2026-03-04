import { PrismaClient, AppointmentStatus, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ─── Config ───────────────────────────────────────────────────────────────────
const NUM_MANAGERS = 2;
const NUM_PATIENTS = 20;
const NUM_DOCTORS = 8;
const NUM_APPOINTMENTS_PER_PATIENT = 3;
const HASHED_PASSWORD = bcrypt.hashSync("Password123!", 10);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMultiple<T>(arr: T[], min = 1, max = 3): T[] {
  const count = randomInt(min, Math.min(max, arr.length));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** Returns a Time-only Date (1970-01-01 HH:MM:00) safe for @db.Time */
function timeOnly(hour: number, minute = 0): Date {
  const d = new Date(0); // epoch
  d.setUTCHours(hour, minute, 0, 0);
  return d;
}

/** Random future or past datetime within ±90 days */
function randomAppointmentDate(pastOnly = false): Date {
  const now = new Date();
  const offset = pastOnly
    ? -randomInt(1, 90) * 86_400_000
    : (Math.random() > 0.4 ? 1 : -1) * randomInt(1, 90) * 86_400_000;
  const d = new Date(now.getTime() + offset);
  d.setMinutes(randomInt(0, 3) * 15); // round to 15-min slots
  d.setSeconds(0, 0);
  return d;
}

// ─── Medical specialties ──────────────────────────────────────────────────────
const SPECIALTY_NAMES = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Practice",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Rheumatology",
  "Urology",
];

// ─── Seeder ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱  Starting seed...\n");

  // ── 0. Clean existing data (order matters for FK constraints) ──────────────
  await prisma.appointment.deleteMany();
  await prisma.doctorAvailability.deleteMany();
  await prisma.doctorSpecialty.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑   Cleared existing records");

  // ── 1. Specialties ─────────────────────────────────────────────────────────
  const specialties = await Promise.all(
    SPECIALTY_NAMES.map((name) =>
      prisma.specialty.create({ data: { name } })
    )
  );
  console.log(`✅  Created ${specialties.length} specialties`);

  // ── 2. Managers ────────────────────────────────────────────────────────────
  await Promise.all(
    Array.from({ length: NUM_MANAGERS }).map((_, i) =>
      prisma.user.create({
        data: {
          email: i === 0 ? "admin@clinic.com" : faker.internet.email(),
          password: HASHED_PASSWORD,
          name: faker.person.fullName(),
          document: faker.string.numeric(11),
          role: UserRole.MANAGER,
        },
      })
    )
  );
  console.log(`✅  Created ${NUM_MANAGERS} managers`);

  // ── 3. Patients ────────────────────────────────────────────────────────────
  const patientRecords: { userId: string; patientId: string }[] = [];

  for (let i = 0; i < NUM_PATIENTS; i++) {
    const user = await prisma.user.create({
      data: {
        email: i === 0 ? "patient@clinic.com" : faker.internet.email(),
        password: HASHED_PASSWORD,
        name: faker.person.fullName(),
        document: faker.string.numeric(11),
        role: UserRole.PATIENT,
        patient: { create: {} },
      },
      include: { patient: true },
    });
    patientRecords.push({ userId: user.id, patientId: user.patient!.id });
  }
  console.log(`✅  Created ${NUM_PATIENTS} patients`);

  // ── 4. Doctors + availabilities + specialties ──────────────────────────────
  const doctorRecords: { userId: string; doctorId: string }[] = [];

  for (let i = 0; i < NUM_DOCTORS; i++) {
    const assignedSpecialties = pickMultiple(specialties, 1, 3);

    // Build Mon–Fri availability blocks (08:00–17:00, lunch break 12:00–13:00)
    const availabilities = [1, 2, 3, 4, 5].flatMap((weekday) => [
      { weekday, startTime: timeOnly(8), endTime: timeOnly(12) },
      { weekday, startTime: timeOnly(13), endTime: timeOnly(17) },
    ]);

    const user = await prisma.user.create({
      data: {
        email: i === 0 ? "doctor@clinic.com" : faker.internet.email(),
        password: HASHED_PASSWORD,
        name: `Dr. ${faker.person.fullName()}`,
        document: faker.string.numeric(11),
        role: UserRole.DOCTOR,
        doctor: {
          create: {
            crm: `CRM-${faker.string.numeric(6)}`,
            doctorAvailabilities: { create: availabilities },
            doctorSpecialties: {
              create: assignedSpecialties.map((s, idx) => ({
                specialtyId: s.id,
                isPrimary: idx === 0,
                obtainedAt: faker.date.past({ years: 10 }),
              })),
            },
          },
        },
      },
      include: { doctor: true },
    });
    doctorRecords.push({ userId: user.id, doctorId: user.doctor!.id });
  }
  console.log(`✅  Created ${NUM_DOCTORS} doctors with availabilities & specialties`);

  // ── 5. Appointments ────────────────────────────────────────────────────────
  const allStatuses = Object.values(AppointmentStatus);
  let appointmentCount = 0;

  for (const { patientId } of patientRecords) {
    for (let i = 0; i < NUM_APPOINTMENTS_PER_PATIENT; i++) {
      const { doctorId } = pickRandom(doctorRecords);
      const status = pickRandom(allStatuses);
      const scheduledAt = randomAppointmentDate();

      const isCanceled = status === AppointmentStatus.CANCELED;
      // canceledBy can be any user — pick a manager or the patient themselves
      const canceledById = isCanceled
        ? pickRandom([...patientRecords, ...doctorRecords]).userId
        : null;

      await prisma.appointment.create({
        data: {
          patientId,
          doctorId,
          scheduledAt,
          durationMin: pickRandom([15, 30, 45, 60]),
          status,
          notes: Math.random() > 0.5 ? faker.lorem.sentence() : null,
          cancelReason: isCanceled ? faker.lorem.sentence() : null,
          canceledAt: isCanceled ? faker.date.recent() : null,
          canceledById,
        },
      });
      appointmentCount++;
    }
  }
  console.log(`✅  Created ${appointmentCount} appointments\n`);

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log("─".repeat(40));
  console.log("🎉  Seed complete!");
  console.log("─".repeat(40));
  console.log("🔑  Demo credentials (password: Password123!)");
  console.log("   manager → admin@clinic.com");
  console.log("   patient → patient@clinic.com");
  console.log("   doctor  → doctor@clinic.com");
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

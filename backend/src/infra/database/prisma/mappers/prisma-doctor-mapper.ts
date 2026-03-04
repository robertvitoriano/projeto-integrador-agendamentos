import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Doctor } from '@/domain/scheduling/enterprise/entities/doctor';
import { Prisma, Doctor as PrismaDoctor } from '@prisma/client';
// Prisma validator that includes the user relation
const doctorWithUser = Prisma.validator<Prisma.DoctorDefaultArgs>()({
  include: { user: true },
});

// Use this type everywhere instead of bare PrismaDoctor
export type PrismaDoctorWithUser = Prisma.DoctorGetPayload<
  typeof doctorWithUser
>;

export class PrismaDoctorMapper {
  static withUsertoDomain(raw: PrismaDoctorWithUser): Doctor {
    return Doctor.create(
      {
        userId: raw.userId,
        crm: raw.crm,
        name: raw.user.name,
        email: raw.user.email,
        password: raw.user.password,
        document: raw.user.document,
        createdAt: raw.createdAt,
        role: raw.user.role,
        updatedAt: raw.user.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static arraywithUserToDomain(raw: PrismaDoctorWithUser[]): Doctor[] {
    return raw.map((doctor) => {
      return this.withUsertoDomain(doctor);
    });
  }

  static toModel(doctor: Doctor): Prisma.DoctorUncheckedCreateInput {
    const { crm, id } = doctor;
    return {
      userId: doctor.userId as string,
      crm,
      id: id.toString(),
    };
  }
}

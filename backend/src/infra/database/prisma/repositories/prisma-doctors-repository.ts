import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { Doctor } from "@/domain/scheduling/enterprise/entities/doctor";
import { PrismaDoctorMapper } from "../mappers/prisma-doctor-mapper";
import { IDoctorsRepository } from "@/domain/scheduling/application/repositories/doctors-repository";
import { IUsersRepository } from "@/domain/scheduling/application/repositories/users-repository";
import { UserRole } from "@/domain/scheduling/enterprise/enums/user-role";
import { User } from "@/domain/scheduling/enterprise/entities/user";

@Injectable()
export class PrismaDoctorsRepository implements IDoctorsRepository {
  constructor(
    private prisma: PrismaService,
    private userRepository: IUsersRepository,
  ) {}
  async create(doctor: Doctor): Promise<void> {
    const user = User.create({
      createdAt: doctor.createdAt,
      document: doctor.document,
      email: doctor.email,
      name: doctor.name,
      password: doctor.password,
      role: doctor.role,
      updatedAt: doctor.updatedAt,
    });
    const createdUser = await this.userRepository.create(user);

    await this.prisma.doctor.create({
      data: {
        crm: doctor.crm,
        userId: createdUser.id.toString(),
      },
    });
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const doctor = await this.prisma.doctor.findFirst({
      include: {
        user: true,
      },
      where: {
        user: {
          email,
          role: UserRole.DOCTOR,
        },
      },
    });

    if (!doctor) return null;
    return PrismaDoctorMapper.withUsertoDomain(doctor);
  }

  delete!: (doctor: Doctor) => Promise<void>;
  save!: (doctor: Doctor) => Promise<void>;
  findById!: (doctorId: string) => Promise<Doctor | null>;
  findManyRecent!: (params: PaginationParams) => Promise<Doctor[]>;
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { Doctor } from '@/domain/scheduling/enterprise/entities/doctor';
import { PrismaDoctorMapper } from '../mappers/prisma-doctor-mapper';
import { UserRole } from '@prisma/client';
import { IDoctorsRepository } from '@/domain/scheduling/application/repositories/doctors-repository';

@Injectable()
export class PrismaDoctorsRepository implements IDoctorsRepository {
  constructor(private prisma: PrismaService) {}
  async create(doctor: Doctor): Promise<void> {
    await this.prisma.doctor.create({
      data: PrismaDoctorMapper.toModel(doctor),
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

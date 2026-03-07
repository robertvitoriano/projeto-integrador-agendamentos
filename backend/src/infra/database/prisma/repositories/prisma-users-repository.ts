import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { Doctor } from "@/domain/scheduling/enterprise/entities/doctor";
import { PrismaDoctorMapper } from "../mappers/prisma-doctor-mapper";
import { IUsersRepository } from "@/domain/scheduling/application/repositories/users-repository";
import { User } from "@/domain/scheduling/enterprise/entities/user";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { UserRole } from "@/domain/scheduling/enterprise/enums/user-role";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(
    private prisma: PrismaService,
  ) {}
  delete!: (user: User) => Promise<void>;
  save!: (user: User) => Promise<void>;
  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        document: user.document,
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
      },
    });

    return User.create({
      createdAt: createdUser.createdAt,
      document: createdUser.document,
      email: createdUser.email,
      name: createdUser.name,
      password: createdUser.password,
      role: createdUser.role,
      updatedAt: createdUser.updatedAt,
    }, new UniqueEntityId(createdUser.id));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  findById!: (doctorId: string) => Promise<Doctor | null>;
  findManyRecent!: (params: PaginationParams) => Promise<Doctor[]>;
}

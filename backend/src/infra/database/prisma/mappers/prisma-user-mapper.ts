import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/scheduling/enterprise/entities/user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        document: raw.document,
        createdAt: raw.createdAt,
        role: raw.role,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toModel(user: User): Prisma.UserUncheckedCreateInput {
    const { createdAt, document, email, id, name, password, role, updatedAt } =
      user;
    return {
      document,
      email,
      name,
      password,
      role,
      createdAt,
      updatedAt,
      id: id.toString(),
    };
  }
}

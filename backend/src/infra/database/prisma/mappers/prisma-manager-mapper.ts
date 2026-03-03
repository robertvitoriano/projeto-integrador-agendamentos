import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Manager } from '@/domain/scheduling/enterprise/entities/manager'
import { Prisma, User as PrismaManager } from '@prisma/client'

export class PrismaManagerMapper {
  static toDomain(raw: PrismaManager): Manager {
    const { email, id, name, password,document } = raw
    return Manager.create(
      {
        password,
        name,
        email,
        document
      },
      new UniqueEntityId(id),
    )
  }

  static arrayToDomain(raw: PrismaManager[]): Manager[] {
    return raw.map((manager) => {
      return this.toDomain(manager)
    })
  }

  static toModel(manager: Manager): Prisma.UserUncheckedCreateInput {
    const { email, id, name, password, document } = manager
    return {
      id: id.toString(),
      password,
      name,
      email,
      document
    }
  }
}

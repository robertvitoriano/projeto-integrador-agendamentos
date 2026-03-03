import { IManagersRepository } from '@/domain/scheduling/application/repositories/manager-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Manager } from '@/domain/scheduling/enterprise/entities/manager'
import { PrismaManagerMapper } from '../mappers/prisma-manager-mapper'

@Injectable()
export class PrismaManagersRepository implements IManagersRepository {
  constructor(private prisma: PrismaService) {}
  async create(manager: Manager): Promise<void> {
    await this.prisma.user.create({
      data: PrismaManagerMapper.toModel(manager),
    })
  }

  async findByEmail(email: string): Promise<Manager | null> {
    const manager = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!manager) return null
    return PrismaManagerMapper.toDomain(manager)
  }

  delete!: (manager: Manager) => Promise<void>
  save!: (manager: Manager) => Promise<void>
  findById!: (managerId: string) => Promise<Manager | null>
  findManyRecent!: (params: PaginationParams) => Promise<Manager[]>
}

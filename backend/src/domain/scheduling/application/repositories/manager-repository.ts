import { PaginationParams } from '@/core/repositories/pagination-params'
import { Manager } from '../../enterprise/entities/manager'

export abstract class IManagersRepository {
  abstract create: (manager: Manager) => Promise<void>
  abstract findByEmail: (email: string) => Promise<Manager | null>
  abstract delete: (manager: Manager) => Promise<void>
  abstract save: (manager: Manager) => Promise<void>
  abstract findById: (managerId: string) => Promise<Manager | null>
  abstract findManyRecent: (params: PaginationParams) => Promise<Manager[]>
}

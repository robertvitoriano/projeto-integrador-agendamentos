import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '../../enterprise/entities/user'

export abstract class IUsersRepository {
  abstract create: (user: User) => Promise<User>
  abstract findByEmail: (email: string) => Promise<User | null>
  abstract delete: (user: User) => Promise<void>
  abstract save: (user: User) => Promise<void>
  abstract findById: (userId: string) => Promise<User | null>
  abstract findManyRecent: (params: PaginationParams) => Promise<User[]>
}

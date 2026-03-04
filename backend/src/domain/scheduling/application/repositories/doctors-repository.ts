import { PaginationParams } from '@/core/repositories/pagination-params'
import { Doctor } from '../../enterprise/entities/doctor'

export abstract class IDoctorsRepository {
  abstract create: (doctor: Doctor) => Promise<void>
  abstract findByEmail: (email: string) => Promise<Doctor | null>
  abstract delete: (doctor: Doctor) => Promise<void>
  abstract save: (doctor: Doctor) => Promise<void>
  abstract findById: (doctorId: string) => Promise<Doctor | null>
  abstract findManyRecent: (params: PaginationParams) => Promise<Doctor[]>
}

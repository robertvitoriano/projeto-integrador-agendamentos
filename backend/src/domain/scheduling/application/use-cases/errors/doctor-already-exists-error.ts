import { UseCaseError } from '@/core/errors/use-case-error'

export class DoctorAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Doctor ${identifier} already exists`)
  }
}

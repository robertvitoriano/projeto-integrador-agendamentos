import { UseCaseError } from '@/core/errors/use-case-error'

export class ManagerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Manager ${identifier} already exists`)
  }
}

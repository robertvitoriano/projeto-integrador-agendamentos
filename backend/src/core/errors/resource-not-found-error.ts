import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
}

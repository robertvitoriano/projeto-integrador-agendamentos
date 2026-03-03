import { failure, Result, success } from '@/core/result'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { ManagerAlreadyExistsError } from './errors/manager-already-exists-error'
import { Manager } from '../../enterprise/entities/manager'
import { IManagersRepository } from '../repositories/manager-repository'

interface RegisterManagerUseCaseRequest {
  name: string
  email: string
  password: string
}
type RegisterManagerUseCaseResponse = Result<
  ManagerAlreadyExistsError,
  {
    manager: Manager
  }
>
@Injectable()
export class RegisterManagerUseCase {
  constructor(
    private managersRepository: IManagersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterManagerUseCaseRequest): Promise<RegisterManagerUseCaseResponse> {
    const managerWithSameEmail =
      await this.managersRepository.findByEmail(email)

    if (managerWithSameEmail) {
      return failure(new ManagerAlreadyExistsError(email))
    }
    const hashedPassword = await this.hashGenerator.hash(password)
    const manager = Manager.create({
      email,
      name,
      password: hashedPassword,
    })
    await this.managersRepository.create(manager)
    return success({ manager })
  }
}

import { failure, Result, success } from '@/core/result'
import { Injectable } from '@nestjs/common'
import { HasheComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-erorr'
import { IManagersRepository } from '../repositories/manager-repository'

interface AuthenticateManagerUseCaseRequest {
  email: string
  password: string
}
type AuthenticateManagerUseCaseResponse = Result<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
@Injectable()
export class AuthenticateManagerUseCase {
  constructor(
    private managersRepository: IManagersRepository,
    private hashComparer: HasheComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateManagerUseCaseRequest): Promise<AuthenticateManagerUseCaseResponse> {
    const manager = await this.managersRepository.findByEmail(email)
    if (!manager) {
      return failure(new WrongCredentialsError())
    }
    const isPasswordValid = await this.hashComparer.compare(
      password,
      manager.password,
    )
    if (!isPasswordValid) {
      return failure(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: manager.id.toString(),
    })

    return success({ accessToken })
  }
}

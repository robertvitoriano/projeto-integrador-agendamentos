import { failure, Result, success } from '@/core/result'
import { Injectable } from '@nestjs/common'
import { HasheComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-erorr'
import { IDoctorsRepository } from '../repositories/doctors-repository'

interface AuthenticateDoctorUseCaseRequest {
  email: string
  password: string
}
type AuthenticateDoctorUseCaseResponse = Result<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private hashComparer: HasheComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateDoctorUseCaseRequest): Promise<AuthenticateDoctorUseCaseResponse> {
    const doctor = await this.doctorsRepository.findByEmail(email)
    if (!doctor) {
      return failure(new WrongCredentialsError())
    }
    const isPasswordValid = await this.hashComparer.compare(
      password,
      doctor.password,
    )
    if (!isPasswordValid) {
      return failure(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: doctor.id.toString(),
    })

    return success({ accessToken })
  }
}

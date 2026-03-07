import { failure, Result, success } from "@/core/result";
import { Injectable } from "@nestjs/common";
import { HasheComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-erorr";
import { IUsersRepository } from "../repositories/users-repository";

interface AuthenticateDoctorUseCaseRequest {
  email: string;
  password: string;
}
type AuthenticateDoctorUseCaseResponse = Result<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashComparer: HasheComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateDoctorUseCaseRequest): Promise<
    AuthenticateDoctorUseCaseResponse
  > {
    try {
      const user = await this.usersRepository.findByEmail(email);
      console.log({user})
      if (!user) {
        return failure(new WrongCredentialsError());
      }
      const isPasswordValid = await this.hashComparer.compare(
        password,
        user.password,
      );
      console.log({isPasswordValid})
      if (!isPasswordValid) {
        return failure(new WrongCredentialsError());
      }

      const accessToken = await this.encrypter.encrypt({
        sub: user.id.toString(),
      });

      return success({ accessToken });
    } catch (error) {
      console.error(error);
    }
    return failure(new WrongCredentialsError());
  }
}

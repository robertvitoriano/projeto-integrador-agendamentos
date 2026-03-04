import { failure, Result, success } from '@/core/result';
import { Injectable } from '@nestjs/common';
import { HashGenerator } from '../cryptography/hash-generator';
import { IDoctorsRepository } from '../repositories/doctors-repository';
import { Doctor } from '../../enterprise/entities/doctor';
import { DoctorAlreadyExistsError } from './errors/doctor-already-exists-error';

interface RegisterDoctorUseCaseRequest {
  name: string;
  email: string;
  password: string;
  document: string;
  crm: string;
}
type RegisterDoctorUseCaseResponse = Result<
  DoctorAlreadyExistsError,
  {
    doctor: Doctor;
  }
>;
@Injectable()
export class RegisterDoctorUseCase {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
    document,
    crm,
  }: RegisterDoctorUseCaseRequest): Promise<RegisterDoctorUseCaseResponse> {
    const doctorWithSameEmail = await this.doctorsRepository.findByEmail(email);

    if (doctorWithSameEmail) {
      return failure(new DoctorAlreadyExistsError(email));
    }
    const hashedPassword = await this.hashGenerator.hash(password);
    const doctor = Doctor.create({
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      name,
      password: hashedPassword,
      document,
      crm,
      role: 'DOCTOR',
    });
    await this.doctorsRepository.create(doctor);
    return success({ doctor });
  }
}

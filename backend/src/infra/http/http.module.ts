import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate-controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterDoctorUseCase } from '@/domain/scheduling/application/use-cases/register-doctor'
import { AuthenticateUserUseCase } from '@/domain/scheduling/application/use-cases/authenticate-user'
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
  ],
  providers: [
    AuthenticateUserUseCase,
    RegisterDoctorUseCase,
  ],
})
export class HttpModule {}

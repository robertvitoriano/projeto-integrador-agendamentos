import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate-controller'
import { DatabaseModule } from '../database/prisma/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateManagerUseCase } from '@/domain/scheduling/application/use-cases/authenticate-manager'
import { RegisterManagerUseCase } from '@/domain/scheduling/application/use-cases/register-manager'
import { CreateBuyController } from './controllers/create-buy.controller'
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateBuyController
  ],
  providers: [
    AuthenticateManagerUseCase,
    RegisterManagerUseCase,
  ],
})
export class HttpModule {}

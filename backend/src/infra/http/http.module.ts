import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate-controller";
import { DatabaseModule } from "../database/prisma/database.module";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterDoctorUseCase } from "@/domain/scheduling/application/use-cases/register-doctor";
import { AuthenticateUserUseCase } from "@/domain/scheduling/application/use-cases/authenticate-user";
import { StartBotController } from "./controllers/start-bot-controller";
import { WhatsAppBot } from "../whatsapp/whats-app-bot";
import { WhatsAppModule } from "../whatsapp/whatsapp.module";

@Module({
  imports: [DatabaseModule, CryptographyModule, WhatsAppModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    StartBotController,
  ],
  providers: [
    AuthenticateUserUseCase,
    RegisterDoctorUseCase,
  ],
})
export class HttpModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { HttpModule } from './http/http.module'
import { JWTStrategy } from './auth/jwt.strategy'
import { AuthModule } from './auth/auth.module'
import { WhatsAppBot } from './whatsapp/whats-app-bot'
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
  ],
  providers: [JWTStrategy],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { BuyConsumer } from './http/controllers/buy-consumer'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
  const buyConsumer = new BuyConsumer()
  await buyConsumer.consume()
  await app.listen(port)
}
bootstrap()

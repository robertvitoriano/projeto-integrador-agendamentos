import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/scheduling/application/cryptography/encrypter'
import { HasheComparer } from '@/domain/scheduling/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/scheduling/application/cryptography/hash-generator'
import { JwtEncrypter } from './jwt-encrypter'
import { BCryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HasheComparer,
      useClass: BCryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BCryptHasher,
    },
  ],
  exports: [Encrypter, HasheComparer, HashGenerator],
})
export class CryptographyModule {}

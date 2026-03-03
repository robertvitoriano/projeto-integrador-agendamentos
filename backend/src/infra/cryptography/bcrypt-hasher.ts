import { HasheComparer } from '@/domain/scheduling/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/scheduling/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BCryptHasher implements HasheComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}

import { randomUUID } from 'crypto'

export class UniqueEntityId {
  private value: string
  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string | null) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityId) {
    return id.toValue() === this.value
  }
}

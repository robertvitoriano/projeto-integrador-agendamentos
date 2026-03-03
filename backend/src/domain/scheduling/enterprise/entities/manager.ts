import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
export interface ManagerProps {
  name: string
  email: string
  password: string
}
export class Manager extends Entity<ManagerProps> {
  get name() {
    return this.props?.name
  }

  get email() {
    return this.props?.email
  }

  get password() {
    return this.props?.password
  }

  static create(props: ManagerProps, id?: UniqueEntityId): Manager {
    return new Manager({ ...props }, id)
  }
}

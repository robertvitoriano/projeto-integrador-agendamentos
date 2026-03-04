// user.ts
import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export type UserRole = 'MANAGER' | 'PATIENT' | 'DOCTOR';

export interface UserProps {
  email: string;
  password: string;
  name: string;
  document: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export class User<T extends UserProps = UserProps> extends Entity<T> {
  get email() { return this.props.email; }
  get password() { return this.props.password; }
  get name() { return this.props.name; }
  get document() { return this.props.document; }
  get role() { return this.props.role; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  static create(props: UserProps, id?: UniqueEntityId): User {
    return new User({ ...props }, id);
  }
}

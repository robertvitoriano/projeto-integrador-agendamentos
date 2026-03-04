import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User, UserProps } from './user';

export interface PatientProps extends UserProps {
  userId: string;
  createdAt: Date;
}

export class Patient extends User<PatientProps> {
  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: PatientProps, id?: UniqueEntityId): Patient {
    return new Patient({ ...props }, id);
  }
}

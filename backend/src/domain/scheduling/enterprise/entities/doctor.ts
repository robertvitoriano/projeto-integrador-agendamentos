// doctor.ts
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User, UserProps } from './user';

export interface DoctorProps extends UserProps {
  crm: string;
  userId?: string;
}

export class Doctor extends User<DoctorProps> {
  get crm() { return this.props.crm; }
  get userId() { return this.props.userId; }

  static create(props: DoctorProps, id?: UniqueEntityId): Doctor {
    return new Doctor({ ...props }, id);
  }
}

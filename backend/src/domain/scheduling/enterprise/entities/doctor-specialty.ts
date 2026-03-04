import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface DoctorSpecialtyProps {
  doctorId: string;
  specialtyId: string;
  isPrimary: boolean;
  obtainedAt?: Date | null;
  createdAt: Date;
}

export class DoctorSpecialty extends Entity<DoctorSpecialtyProps> {
  get doctorId() {
    return this.props.doctorId;
  }

  get specialtyId() {
    return this.props.specialtyId;
  }

  get isPrimary() {
    return this.props.isPrimary;
  }

  get obtainedAt() {
    return this.props.obtainedAt ?? null;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: DoctorSpecialtyProps, id?: UniqueEntityId): DoctorSpecialty {
    return new DoctorSpecialty({ ...props }, id);
  }
}

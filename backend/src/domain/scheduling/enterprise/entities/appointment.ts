import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'NO_SHOW';

export interface AppointmentProps {
  patientId: string;
  doctorId: string;
  scheduledAt: Date;
  durationMin: number;
  status: AppointmentStatus;
  notes?: string | null;
  cancelReason?: string | null;
  canceledAt?: Date | null;
  canceledById?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment extends Entity<AppointmentProps> {
  get patientId() {
    return this.props.patientId;
  }

  get doctorId() {
    return this.props.doctorId;
  }

  get scheduledAt() {
    return this.props.scheduledAt;
  }

  get durationMin() {
    return this.props.durationMin;
  }

  get status() {
    return this.props.status;
  }

  get notes() {
    return this.props.notes ?? null;
  }

  get cancelReason() {
    return this.props.cancelReason ?? null;
  }

  get canceledAt() {
    return this.props.canceledAt ?? null;
  }

  get canceledById() {
    return this.props.canceledById ?? null;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  isCanceled(): boolean {
    return this.props.status === 'CANCELED';
  }

  isCompleted(): boolean {
    return this.props.status === 'COMPLETED';
  }

  static create(props: AppointmentProps, id?: UniqueEntityId): Appointment {
    return new Appointment({ ...props }, id);
  }
}

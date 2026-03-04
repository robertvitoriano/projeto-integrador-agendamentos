import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface DoctorAvailabilityProps {
  doctorId: string;
  /** 0 = Sunday, 1 = Monday … 6 = Saturday (ISO: 1 = Monday … 7 = Sunday) */
  weekday: number;
  /** Time-only value — only HH:mm matters */
  startTime: Date;
  /** Time-only value — only HH:mm matters */
  endTime: Date;
}

export class DoctorAvailability extends Entity<DoctorAvailabilityProps> {
  get doctorId() {
    return this.props.doctorId;
  }

  get weekday() {
    return this.props.weekday;
  }

  get startTime() {
    return this.props.startTime;
  }

  get endTime() {
    return this.props.endTime;
  }

  /** Returns duration of the slot in minutes */
  durationInMinutes(): number {
    const start = this.props.startTime.getUTCHours() * 60 + this.props.startTime.getUTCMinutes();
    const end = this.props.endTime.getUTCHours() * 60 + this.props.endTime.getUTCMinutes();
    return end - start;
  }

  static create(props: DoctorAvailabilityProps, id?: UniqueEntityId): DoctorAvailability {
    return new DoctorAvailability({ ...props }, id);
  }
}

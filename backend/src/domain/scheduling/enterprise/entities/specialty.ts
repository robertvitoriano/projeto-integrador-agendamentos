import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface SpecialtyProps {
  name: string;
  createdAt: Date;
}

export class Specialty extends Entity<SpecialtyProps> {
  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: SpecialtyProps, id?: UniqueEntityId): Specialty {
    return new Specialty({ ...props }, id);
  }
}

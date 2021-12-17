import { Specification } from '../models/Specification';
import {
  ISpecificationsRepositoru,
  ICreateSpecificationDTO,
} from './ISpecifications.Repository';

class SpecificationsRepository implements ISpecificationsRepositoru {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
}

export { SpecificationsRepository };

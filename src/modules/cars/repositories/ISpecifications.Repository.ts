interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepositoru {
  create({ name, description }: ICreateSpecificationDTO): void;
}

export { ISpecificationsRepositoru, ICreateSpecificationDTO };

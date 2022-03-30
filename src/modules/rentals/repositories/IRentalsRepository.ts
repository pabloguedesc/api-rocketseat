import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCarByCar(car_id: string): Promise<Rental>;
}

export { IRentalsRepository };

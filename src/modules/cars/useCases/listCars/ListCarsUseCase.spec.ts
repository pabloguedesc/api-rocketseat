import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "DEF-659",
      fine_amount: 40,
      category_id: "Category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand",
    });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      brand: "Car_brand_test",
      daily_rate: 100,
      license_plate: "DEF-659",
      fine_amount: 40,
      category_id: "Category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });
});

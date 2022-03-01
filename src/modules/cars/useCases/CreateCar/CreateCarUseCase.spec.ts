import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const newCar = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name Car",
    });

    expect(newCar).toHaveProperty("id");
  });

  it("Should not be able to create a new car with license plate exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        brand: "Brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });

      await createCarUseCase.execute({
        name: "Car2",
        brand: "Brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "New Car test",
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-516651",
    });

    expect(car.available).toEqual(true);
  });
});

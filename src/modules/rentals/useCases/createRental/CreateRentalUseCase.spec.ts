import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1313",
      user_id: "51678",
      expect_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1313",
        user_id: "51678",
        expect_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "1313",
        user_id: "51678",
        expect_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "sameCarValueTest",
        user_id: "UserDifferentTest",
        expect_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "sameCarValueTest",
        user_id: "DifferentUserTest",
        expect_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

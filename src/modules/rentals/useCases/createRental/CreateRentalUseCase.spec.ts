import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    await createRentalUseCase.execute({
      car_id: "1313",
      user_id: "51678",
      expect_return_date: new Date(),
    });
  });
});

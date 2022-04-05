import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expect_return_date } = request.body;
    const { id: user_id } = request.user;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id,
      expect_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };

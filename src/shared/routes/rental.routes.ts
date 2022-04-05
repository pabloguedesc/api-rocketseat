import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.post("/", createRentalController.handle);

export { rentalRoutes };

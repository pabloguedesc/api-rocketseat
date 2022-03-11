import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);
carsRoutes.post("/", ensureAdmin, createCarController.handle);

export { carsRoutes };

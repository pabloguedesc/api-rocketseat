import { Router } from "express";
import { CreateSpecificatioController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificatioController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };

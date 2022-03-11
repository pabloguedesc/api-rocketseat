import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { CreateSpecificationController } from "../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../infra/http/middlewares/ensureAuthenticate";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRoutes };

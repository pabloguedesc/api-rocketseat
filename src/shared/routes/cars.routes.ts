import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImages/UploadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./temp/cars"));

carsRoutes.use(ensureAuthenticated);
carsRoutes.post("/", ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAdmin,
  createCarSpecificationController.handle,
);
carsRoutes.post(
  "/images/:id",
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle,
);

export { carsRoutes };

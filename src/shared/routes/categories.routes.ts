import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { CreateCategoryController } from "../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle,
);

export { categoriesRoutes };

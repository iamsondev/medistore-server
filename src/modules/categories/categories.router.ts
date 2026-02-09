import express, { Router } from "express";
import { categoriesController } from "./categories.controller";
import auth, { userRole } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(userRole.ADMIN), categoriesController.createCategory);

router.get("/", categoriesController.getCategory);

router.patch("/:id", auth(userRole.ADMIN), categoriesController.updateCategory);

router.delete(
  "/:id",
  auth(userRole.ADMIN),
  categoriesController.deleteCategory,
);

export const categoriesRouter: Router = router;

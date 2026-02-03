import express, { Router } from "express";
import { categoriesController } from "./categories.controller";

const router = express.Router();

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getCategory);
export const categoriesRouter: Router = router;

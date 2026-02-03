import express, { Router } from "express";
import { categoriesController } from "./categories.controller";

const router = express.Router();

router.post("/", categoriesController.createCategory);

export const categoriesRouter: Router = router;

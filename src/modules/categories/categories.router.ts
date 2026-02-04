import express, { Router } from "express";
import { categoriesController } from "./categories.controller";
import auth, { userRole } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(userRole.ADMIN), categoriesController.createCategory);
router.get("/", categoriesController.getCategory);
export const categoriesRouter: Router = router;

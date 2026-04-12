import express, { Router } from "express";
import auth, { userRole } from "../../middlewares/auth.js";
import { AIController } from "./ai.controller.js";

const router = express.Router();

router.post("/generate-description", auth(userRole.ADMIN, userRole.SELLER), AIController.generateDescription);
router.post("/chat", AIController.chatWithBot);

export const AIRouter: Router = router;

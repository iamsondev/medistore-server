import { Router } from "express";
import { paymentController } from "./payment.controller.js";
import auth, { userRole } from "../../middlewares/auth.js";

const router = Router();

router.post("/checkout", auth(userRole.CUSTOMER), paymentController.checkout);
router.get("/verify", auth(userRole.CUSTOMER), paymentController.verify);

export const paymentRoutes: Router = router;

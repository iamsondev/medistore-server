import express, { Router } from "express";
import auth, { userRole } from "../../middlewares/auth.js";
import { ReviewController } from "./reviews.controller.js";
const router = express.Router();

router.post("/", auth(userRole.CUSTOMER), ReviewController.createReview);

router.get("/", auth(userRole.ADMIN, userRole.MODERATOR), ReviewController.getAllReviews);
router.get("/:medicineId", ReviewController.getMedicineReviews);
router.patch("/:id", auth(userRole.CUSTOMER), ReviewController.updateReview);

router.delete("/:id", auth(userRole.CUSTOMER, userRole.MODERATOR, userRole.ADMIN), ReviewController.deleteReview);

export const ReviewsRouter: Router = router;

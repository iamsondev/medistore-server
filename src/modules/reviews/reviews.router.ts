import express, { Router } from "express";
import auth, { userRole } from "../../middlewares/auth";
import { ReviewController } from "./reviews.controller";
const router = express.Router();

router.post("/", auth(userRole.CUSTOMER), ReviewController.createReview);

router.get("/:medicineId", ReviewController.getMedicineReviews);
router.patch("/:id", auth(userRole.CUSTOMER), ReviewController.updateReview);

router.delete("/:id", auth(userRole.CUSTOMER), ReviewController.deleteReview);

export const ReviewsRouter: Router = router;

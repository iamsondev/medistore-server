import express, { Router } from "express";
import auth, { userRole } from "../../middlewares/auth";
import { ReviewController } from "./reviews.controller";
const router = express.Router();

router.post("/", auth(userRole.CUSTOMER), ReviewController.createReview);

router.get("/:medicineId", ReviewController.getMedicineReviews);

export const ReviewsRouter: Router = router;

import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./reviews.service";
import { ReviewValidation } from "./reviews.validation";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = ReviewValidation.createReviewSchema.parse(req.body);
    const userId = (req as any).user.id;
    const result = await ReviewService.createReview(userId, validatedData);
    res.status(201).json({
      success: true,
      message: "review added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getMedicineReviews(
      req.params.medicineId as any,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ReviewController = { createReview, getMedicineReviews };

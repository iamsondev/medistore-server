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

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const result = await ReviewService.updateReview(
      userId,
      id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    await ReviewService.deleteReview(userId, id as string);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  createReview,
  getMedicineReviews,
  updateReview,
  deleteReview,
};

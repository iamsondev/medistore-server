import { Request, Response } from "express";
import { ReviewService } from "./reviews.service.js";
import { ReviewValidation } from "./reviews.validation.js";

const createReview = async (req: Request, res: Response) => {
  try {
    const validatedData = ReviewValidation.createReviewSchema.parse(req.body);
    const userId = (req as any).user.id;
    const result = await ReviewService.createReview(userId, validatedData);
    res.status(201).json({
      success: true,
      message: "review added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getMedicineReviews(
      req.params.medicineId as any,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getAllReviews();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const updateReview = async (req: Request, res: Response) => {
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
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const deleteReview = async (req: Request, res: Response) => {
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
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

export const ReviewController = {
  createReview,
  getMedicineReviews,
  getAllReviews,
  updateReview,
  deleteReview,
};

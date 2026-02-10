import { ReviewService } from "./reviews.service";
import { ReviewValidation } from "./reviews.validation";
const createReview = async (req, res, next) => {
    try {
        const validatedData = ReviewValidation.createReviewSchema.parse(req.body);
        const userId = req.user.id;
        const result = await ReviewService.createReview(userId, validatedData);
        res.status(201).json({
            success: true,
            message: "review added successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
        next(error);
    }
};
const getMedicineReviews = async (req, res) => {
    try {
        const result = await ReviewService.getMedicineReviews(req.params.medicineId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await ReviewService.updateReview(userId, id, req.body);
        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await ReviewService.deleteReview(userId, id);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
export const ReviewController = {
    createReview,
    getMedicineReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=reviews.controller.js.map
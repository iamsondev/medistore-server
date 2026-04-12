import { ReviewService } from "./reviews.service.js";
import { ReviewValidation } from "./reviews.validation.js";
const createReview = async (req, res) => {
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
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMedicineReviews = async (req, res) => {
    try {
        const result = await ReviewService.getMedicineReviews(req.params.medicineId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllReviews = async (req, res) => {
    try {
        const result = await ReviewService.getAllReviews();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateReview = async (req, res) => {
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
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteReview = async (req, res) => {
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
        res.status(500).json({ success: false, message: error.message });
    }
};
export const ReviewController = {
    createReview,
    getMedicineReviews,
    getAllReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=reviews.controller.js.map
import { z } from "zod";
const createReviewSchema = z.object({
    medicineId: z.string().uuid("Invalid medicine ID"),
    rating: z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5"),
    comment: z.string().min(5, "Comment must be at least 5 characters long"),
});
export const ReviewValidation = { createReviewSchema };
//# sourceMappingURL=reviews.validation.js.map
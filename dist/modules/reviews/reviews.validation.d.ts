import { z } from "zod";
export declare const ReviewValidation: {
    createReviewSchema: z.ZodObject<{
        medicineId: z.ZodString;
        rating: z.ZodNumber;
        comment: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=reviews.validation.d.ts.map
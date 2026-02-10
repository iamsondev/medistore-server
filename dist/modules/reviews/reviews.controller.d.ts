import { NextFunction, Request, Response } from "express";
export declare const ReviewController: {
    createReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMedicineReviews: (req: Request, res: Response) => Promise<void>;
    updateReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=reviews.controller.d.ts.map
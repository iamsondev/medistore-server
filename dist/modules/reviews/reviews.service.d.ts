export declare const ReviewService: {
    createReview: (userId: string, data: {
        rating: number;
        comment: string;
        medicineId: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        medicineId: string;
        rating: number;
        comment: string;
    }>;
    getMedicineReviews: (medicineId: string) => Promise<({
        User: {
            name: string | null;
            image: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        medicineId: string;
        rating: number;
        comment: string;
    })[]>;
    updateReview: (userId: string, reviewId: string, payload: {
        rating?: number;
        comment?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        medicineId: string;
        rating: number;
        comment: string;
    }>;
    deleteReview: (userId: string, reviewId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        medicineId: string;
        rating: number;
        comment: string;
    }>;
};
//# sourceMappingURL=reviews.service.d.ts.map
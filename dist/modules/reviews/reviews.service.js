import { prisma } from "../../lib/prisma.js";
import { AIService } from "../ai/ai.service.js";
const createReview = async (userId, data) => {
    const hasPurchased = await prisma.order.findFirst({
        where: {
            customerId: userId,
            status: "DELIVERED",
            orderItems: { some: { medicineId: data.medicineId } },
        },
    });
    if (!hasPurchased) {
        throw new Error("you can write review your bought medicine");
    }
    const alreadyReviewed = await prisma.review.findFirst({
        where: {
            userId: userId,
            medicineId: data.medicineId,
        },
    });
    if (alreadyReviewed) {
        throw new Error("You have already submitted a review for this medicine.");
    }
    // AI Integration: Automated Review Moderation
    const isToxic = await AIService.checkReviewToxicity(data.comment);
    if (isToxic) {
        throw new Error("Your review was flagged by our AI for containing inappropriate or toxic language. Please revise it.");
    }
    return await prisma.review.create({
        data: {
            rating: data.rating,
            comment: data.comment,
            medicineId: data.medicineId,
            userId: userId,
        },
    });
};
const getMedicineReviews = async (medicineId) => {
    return await prisma.review.findMany({
        where: { medicineId },
        include: { User: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const updateReview = async (userId, reviewId, payload) => {
    const isOwner = await prisma.review.findUnique({
        where: { id: reviewId, userId: userId },
    });
    if (!isOwner) {
        throw new Error("You are not authorized to update this review!");
    }
    return await prisma.review.update({
        where: { id: reviewId },
        data: payload,
    });
};
const getAllReviews = async () => {
    return await prisma.review.findMany({
        include: {
            User: { select: { name: true, image: true } },
            medicine: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
    });
};
const deleteReview = async (userId, reviewId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const isOwner = await prisma.review.findUnique({
        where: { id: reviewId, userId: userId },
    });
    if (!isOwner && user?.role !== "ADMIN" && user?.role !== "MODERATOR") {
        throw new Error("You are not authorized to delete this review!");
    }
    return await prisma.review.delete({
        where: { id: reviewId },
    });
};
export const ReviewService = {
    createReview,
    getMedicineReviews,
    getAllReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=reviews.service.js.map
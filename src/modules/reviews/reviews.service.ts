import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  data: { rating: number; comment: string; medicineId: string },
) => {
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

  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      medicineId: data.medicineId,
      userId: userId,
    },
  });
};

const getMedicineReviews = async (medicineId: string) => {
  return await prisma.review.findMany({
    where: { medicineId },
    include: { User: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = { createReview, getMedicineReviews };

import { Medicine } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type AddMedicinePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  image: string;
  categoryId: string;
};

const addMedicine = async (data: AddMedicinePayload, userId: string) => {
  return prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId,
    },
  });
};

const getAllMedicines = async (payload: {
  search?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  categoryId?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
}) => {
  const { search, minPrice, maxPrice, categoryId, sortBy, sortOrder } = payload;

  const whereConditions: any = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { manufacturer: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      categoryId ? { categoryId } : {},
      minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {},
    ],
  };

  return await prisma.medicine.findMany({
    where: whereConditions,
    orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : { createdAt: "desc" },
    include: {
      category: true,
    },
  });
};

const getMedicineById = async (id: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
export const medicinesService = {
  addMedicine,
  getAllMedicines,
  getMedicineById,
};

import { Prisma } from "@prisma/client";
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
      viewCount: 0,
    },
  });
};

const getAllMedicines = async (payload: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  sellerId?: string;
  page?: number;
  limit?: number;
}) => {
  const {
    search,
    minPrice,
    maxPrice,
    categoryId,
    sortBy,
    sortOrder,
    sellerId,
    page = 1,
    limit = 10,
  } = payload;

  const skip = (page - 1) * limit;

  const andConditions: Prisma.MedicineWhereInput[] = [];

  if (sellerId) andConditions.push({ sellerId });
  if (search)
    andConditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { manufacturer: { contains: search, mode: "insensitive" } },
      ],
    });
  if (categoryId) andConditions.push({ categoryId });
  if (minPrice !== undefined || maxPrice !== undefined)
    andConditions.push({
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const medicines = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: whereConditions,
    orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : { viewCount: "desc" },
    include: { category: true },
  });

  const total = await prisma.medicine.count({ where: whereConditions });

  return { medicines, total };
};

const getMedicineById = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.medicine.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    const medicineData = await tx.medicine.findUnique({
      where: { id },
      include: {
        category: true,
        seller: true,
      },
    });

    return medicineData;
  });

  return result;
};

const updateMedicine = async (
  id: string,
  userId: string,
  data: Partial<AddMedicinePayload>,
) => {
  return await prisma.medicine.update({
    where: {
      id,
      sellerId: userId, //
    },
    data,
  });
};

const deleteMedicine = async (id: string, userId: string) => {
  return await prisma.medicine.delete({
    where: {
      id,
      sellerId: userId,
    },
  });
};

export const medicinesService = {
  addMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};

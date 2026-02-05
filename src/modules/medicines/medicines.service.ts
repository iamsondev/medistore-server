import { Medicine } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const addMedicine = async (
  data: Omit<Medicine, "id" | "createdAt" | "updatedAt" | "sellerId">,
  userId: string,
) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId,
    },
  });
  return result;
};

const getAllMedicines = async (payload: { search: string | undefined }) => {
  const result = await prisma.medicine.findMany({
    where: {
      name: {
        contains: payload.search as string,
        mode: "insensitive",
      },
    },
  });
  return result;
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

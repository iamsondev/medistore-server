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

const getAllMedicines = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};
export const medicinesService = {
  addMedicine,
  getAllMedicines,
};

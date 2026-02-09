import { Category } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt">,
) => {
  return await prisma.category.create({
    data,
  });
};

const getCategory = async () => {
  return await prisma.category.findMany();
};

const updateCategory = async (
  id: string,
  data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>,
) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};

export const categoriesService = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

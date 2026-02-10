import { prisma } from "../../lib/prisma";
const createCategory = async (data) => {
    return await prisma.category.create({
        data,
    });
};
const getCategory = async () => {
    return await prisma.category.findMany();
};
const updateCategory = async (id, data) => {
    return await prisma.category.update({
        where: { id },
        data,
    });
};
const deleteCategory = async (id) => {
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
//# sourceMappingURL=categories.service.js.map
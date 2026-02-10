import { prisma } from "../../lib/prisma";
const addMedicine = async (data, userId) => {
    return prisma.medicine.create({
        data: {
            ...data,
            sellerId: userId,
            viewCount: 0,
        },
    });
};
const getAllMedicines = async (payload) => {
    const { search, minPrice, maxPrice, categoryId, sortBy, sortOrder, sellerId, page = 1, limit = 10, } = payload;
    const skip = (page - 1) * limit;
    const andConditions = [];
    if (sellerId)
        andConditions.push({ sellerId });
    if (search)
        andConditions.push({
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { manufacturer: { contains: search, mode: "insensitive" } },
            ],
        });
    if (categoryId)
        andConditions.push({ categoryId });
    if (minPrice !== undefined || maxPrice !== undefined)
        andConditions.push({
            price: {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
            },
        });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
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
const getMedicineById = async (id) => {
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
const updateMedicine = async (id, userId, data) => {
    return await prisma.medicine.update({
        where: {
            id,
            sellerId: userId, //
        },
        data,
    });
};
const deleteMedicine = async (id, userId) => {
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
//# sourceMappingURL=medicines.service.js.map
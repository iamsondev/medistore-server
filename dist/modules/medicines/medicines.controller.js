import { medicinesService } from "./medicines.service";
import { z } from "zod";
import { paginationHelpers } from "../../helpers/paginationSortingHelpers";
const createMedicineSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(5),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    manufacturer: z.string().min(1),
    image: z.string().url(),
    categoryId: z.string().uuid(),
});
const getAllMedicinesSchema = z.object({
    search: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    sortBy: z.enum(["price", "createdAt", "name", "viewCount"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sellerId: z.string().optional(),
});
const updateMedicineSchema = createMedicineSchema.partial();
const addMedicine = async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        const parsedBody = createMedicineSchema.parse(req.body);
        const result = await medicinesService.addMedicine(parsedBody, user.id);
        res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Medicine creation failed",
            error: err?.errors || err.message,
        });
    }
};
const getAllMedicines = async (req, res) => {
    try {
        const parsedQuery = getAllMedicinesSchema.parse(req.query);
        const paginationOptions = {
            page: parsedQuery.page ? Number(parsedQuery.page) : undefined,
            limit: parsedQuery.limit ? Number(parsedQuery.limit) : undefined,
            sortBy: parsedQuery.sortBy,
            sortOrder: parsedQuery.sortOrder,
        };
        const pagination = paginationHelpers.calculatePagination(paginationOptions);
        const filters = {
            search: parsedQuery.search,
            minPrice: parsedQuery.minPrice !== undefined
                ? Number(parsedQuery.minPrice)
                : undefined,
            maxPrice: parsedQuery.maxPrice !== undefined
                ? Number(parsedQuery.maxPrice)
                : undefined,
            categoryId: parsedQuery.categoryId,
            sellerId: parsedQuery.sellerId,
            ...pagination,
        };
        const result = await medicinesService.getAllMedicines(filters);
        res.status(200).json({
            success: true,
            message: "Medicines fetched successfully",
            meta: {
                total: result.total,
                page: pagination.page,
                limit: pagination.limit,
            },
            data: result.medicines,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch medicines",
            error: err?.errors || err.message,
        });
    }
};
const getMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await medicinesService.getMedicineById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Medicine details fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch medicine",
            error: err.message,
        });
    }
};
const updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        const parsedBody = updateMedicineSchema.parse(req.body);
        const result = await medicinesService.updateMedicine(id, user.id, parsedBody);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Update failed",
            error: err?.errors || err.message,
        });
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user)
            return res.status(401).json({ success: false, message: "Unauthorized" });
        await medicinesService.deleteMedicine(id, user.id);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Deletion failed",
            error: err.message,
        });
    }
};
export const medicinesController = {
    addMedicine,
    getAllMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
};
//# sourceMappingURL=medicines.controller.js.map
import { Request, Response } from "express";
import { medicinesService } from "./medicines.service";
import { z } from "zod";

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
  sortBy: z.enum(["price", "createdAt", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

const addMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const parsedBody = createMedicineSchema.parse(req.body);

    const result = await medicinesService.addMedicine(parsedBody, user.id);

    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "Medicine creation failed",
      error: err?.errors || err.message,
    });
  }
};

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const parsedQuery = getAllMedicinesSchema.parse(req.query);

    const minPrice = parsedQuery.minPrice
      ? Number(parsedQuery.minPrice)
      : undefined;
    const maxPrice = parsedQuery.maxPrice
      ? Number(parsedQuery.maxPrice)
      : undefined;

    const filters = {
      search: parsedQuery.search,
      minPrice,
      maxPrice,
      categoryId: parsedQuery.categoryId,
      sortBy: parsedQuery.sortBy,
      sortOrder: parsedQuery.sortOrder,
    };

    const result = await medicinesService.getAllMedicines(filters);

    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch medicines",
      error: err?.errors || err.message,
    });
  }
};

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await medicinesService.getMedicineById(id as string);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    }

    res.status(200).json({
      success: true,
      message: "Medicine details fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const medicinesController = {
  addMedicine,
  getAllMedicines,
  getMedicineById,
};

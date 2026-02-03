import { Request, Response } from "express";
import { categoriesService } from "./categories.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("Body Data:", req.body);
    const result = await categoriesService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    console.error("FULL PRISMA ERROR:", e);
    res.status(400).json({
      Error: "category creation failed",
      details: e.message,
    });
  }
};

export const categoriesController = {
  createCategory,
};

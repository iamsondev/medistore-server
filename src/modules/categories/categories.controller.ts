import { Request, Response } from "express";
import { categoriesService } from "./categories.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoriesService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({
      Error: "category creation failed",
      details: e.message,
    });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoriesService.getCategory();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: "false",
      message: "category fetch failed",
      Error: err,
    });
  }
};
export const categoriesController = {
  createCategory,
  getCategory,
};

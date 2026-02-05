import { Request, Response } from "express";
import { medicinesService } from "./medicines.service";
import { success } from "better-auth/*";

const addMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await medicinesService.addMedicine(req.body, user.id);
    res.status(201).json({
      success: true,
      message: "medicine created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "medicine creation failed",
      error: err.message,
    });
  }
};

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const result = await medicinesService.getAllMedicines({
      search: searchString,
    });
    res.status(200).json({
      success: true,
      message: "medicine fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: "failed to fetched medicine",
      error: err.message,
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

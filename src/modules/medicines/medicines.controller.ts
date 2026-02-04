import { Request, Response } from "express";
import { medicinesService } from "./medicines.service";

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
    const result = await medicinesService.getAllMedicines();
    res.status(200).json({
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

export const medicinesController = {
  addMedicine,
  getAllMedicines,
};

import { categoriesService } from "./categories.service";
const createCategory = async (req, res) => {
    try {
        const result = await categoriesService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "Category creation failed",
            details: e.message,
        });
    }
};
const getCategory = async (req, res) => {
    try {
        const result = await categoriesService.getCategory();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Category fetch failed",
            Error: err.message,
        });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoriesService.updateCategory(id, req.body);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Category update failed",
            Error: err.message,
        });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoriesService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Category deletion failed",
            Error: err.message,
        });
    }
};
export const categoriesController = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=categories.controller.js.map
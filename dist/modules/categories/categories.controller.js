import { categoriesService } from "./categories.service.js";
const createCategory = async (req, res) => {
    try {
        const result = await categoriesService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error,
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
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get categories",
            error,
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
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update category",
            error,
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
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error,
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
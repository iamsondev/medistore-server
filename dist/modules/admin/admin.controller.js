import { AdminService } from "./admin.service";
const getAllUsers = async (req, res, next) => {
    try {
        const result = await AdminService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await AdminService.updateUserStatusInDB(id, status);
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getStatistics = async (req, res, next) => {
    try {
        const result = await AdminService.getPlatformStatistics();
        res.status(200).json({
            success: true,
            message: "Platform statistics retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getStatistics,
};
//# sourceMappingURL=admin.controller.js.map
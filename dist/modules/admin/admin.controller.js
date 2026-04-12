import { AdminService } from "./admin.service.js";
const getAllUsers = async (req, res) => {
    try {
        const result = await AdminService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, role } = req.body;
        const adminId = req.user?.id;
        const result = await AdminService.updateUserRoleStatusInDB(id, { status, role }, adminId);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
const getStatistics = async (req, res) => {
    try {
        const result = await AdminService.getPlatformStatistics();
        res.status(200).json({
            success: true,
            message: "Platform statistics retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
const getDeliveryAgents = async (req, res) => {
    try {
        const result = await AdminService.getDeliveryAgentsFromDB();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getStatistics,
    getDeliveryAgents,
};
//# sourceMappingURL=admin.controller.js.map
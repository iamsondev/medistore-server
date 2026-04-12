import { orderService } from "./orders.service.js";
import { OrderValidation } from "./orders.validation.js";
const createOrder = async (req, res) => {
    try {
        const validatedData = OrderValidation.createOrderSchema.parse(req.body);
        const user = req.user;
        const result = await orderService.createOrder(user.id, validatedData);
        res.status(201).json({
            success: true,
            message: "Order placed successfully! 💊",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMyOrders = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found in request" });
        }
        const result = await orderService.getMyOrders(user.id);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const result = await orderService.getOrderById(id, user.id);
        if (!result) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }
        res.status(200).json({
            success: true,
            message: "Order details retrieved",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getSellerOrders = async (req, res) => {
    try {
        const user = req.user;
        const result = await orderService.getSellerOrders(user.id);
        res.status(200).json({
            success: true,
            message: "Seller orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, deliveryAgentId } = OrderValidation.updateStatusSchema.parse(req.body);
        const user = req.user;
        const result = await orderService.updateOrderStatus(id, user.id, status, deliveryAgentId);
        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const result = await orderService.getAllOrders();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMyAssignedOrders = async (req, res) => {
    try {
        const user = req.user;
        const result = await orderService.getAssignedOrders(user.id);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getDeliveryHistory = async (req, res) => {
    try {
        const user = req.user;
        const result = await orderService.getDeliveryHistory(user.id);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const OrderController = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus,
    getAllOrders,
    getMyAssignedOrders,
    getDeliveryHistory,
};
//# sourceMappingURL=orders.controller.js.map
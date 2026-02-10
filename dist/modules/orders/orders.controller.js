import { orderService } from "./orders.service";
import { OrderValidation } from "./orders.validation";
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
        res.status(400).json({
            success: false,
            message: error.message || "Failed to place order",
        });
    }
};
// orders.controller.ts
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
        res.status(500).json({ success: false, message: "Server error" });
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
        const { status } = OrderValidation.updateStatusSchema.parse(req.body);
        const user = req.user;
        const result = await orderService.updateOrderStatus(id, user.id, status);
        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const OrderController = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus,
};
//# sourceMappingURL=orders.controller.js.map
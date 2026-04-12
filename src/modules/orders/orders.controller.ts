import { Request, Response } from "express";
import { orderService } from "./orders.service.js";
import { OrderValidation } from "./orders.validation.js";

const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = OrderValidation.createOrderSchema.parse(req.body);
    const user = (req as any).user;
    const result = await orderService.createOrder(user.id, validatedData);

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 💊",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found in request" });
    }

    const result = await orderService.getMyOrders(user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const result = await orderService.getOrderById(id as string, user.id);

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
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await orderService.getSellerOrders(user.id);

    res.status(200).json({
      success: true,
      message: "Seller orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, deliveryAgentId } = OrderValidation.updateStatusSchema.parse(
      req.body,
    );
    const user = (req as any).user;

    const result = await orderService.updateOrderStatus(
      id as string,
      user.id,
      status,
      deliveryAgentId,
    );

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getMyAssignedOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await orderService.getAssignedOrders(user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

const getDeliveryHistory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await orderService.getDeliveryHistory(user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
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

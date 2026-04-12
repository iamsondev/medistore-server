import express from "express";
import { OrderController } from "./orders.controller.js";
import auth, { userRole } from "../../middlewares/auth.js";
const router = express.Router();
router.post("/", auth(userRole.CUSTOMER), OrderController.createOrder);
router.get("/seller", auth(userRole.SELLER), OrderController.getSellerOrders);
router.get("/", auth(userRole.ADMIN, userRole.CUSTOMER, userRole.SELLER), OrderController.getMyOrders);
router.get("/:id", auth(userRole.ADMIN, userRole.CUSTOMER, userRole.SELLER), OrderController.getOrderById);
router.patch("/:id/status", auth(userRole.SELLER, userRole.DELIVERY_AGENT, userRole.ADMIN), OrderController.updateOrderStatus);
router.get("/admin/all", auth(userRole.ADMIN), OrderController.getAllOrders);
router.get("/delivery/my-orders", auth(userRole.DELIVERY_AGENT), OrderController.getMyAssignedOrders);
router.get("/delivery/history", auth(userRole.DELIVERY_AGENT), OrderController.getDeliveryHistory);
export const OrdersRouter = router;
//# sourceMappingURL=orders.route.js.map
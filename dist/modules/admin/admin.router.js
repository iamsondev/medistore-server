import express from "express";
import auth, { userRole } from "../../middlewares/auth.js";
import { AdminController } from "./admin.controller.js";
const router = express.Router();
router.get("/statistics", auth(userRole.ADMIN, userRole.MODERATOR), AdminController.getStatistics);
router.get("/users", auth(userRole.ADMIN, userRole.MODERATOR), AdminController.getAllUsers);
router.patch("/users/:id", auth(userRole.ADMIN), AdminController.updateUserStatus);
router.get("/delivery-agents", auth(userRole.ADMIN), AdminController.getDeliveryAgents);
export const AdminRouter = router;
//# sourceMappingURL=admin.router.js.map
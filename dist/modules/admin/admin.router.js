import express from "express";
import auth, { userRole } from "../../middlewares/auth.js";
import { AdminController } from "./admin.controller.js";
const router = express.Router();
router.get("/statistics", auth(userRole.ADMIN), AdminController.getStatistics);
router.get("/users", auth(userRole.ADMIN), AdminController.getAllUsers);
router.patch("/users/:id", auth(userRole.ADMIN), AdminController.updateUserStatus);
export const AdminRouter = router;
//# sourceMappingURL=admin.router.js.map
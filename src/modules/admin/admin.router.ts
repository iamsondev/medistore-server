import express, { Router } from "express";
import auth, { userRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/users", auth(userRole.ADMIN), AdminController.getAllUsers);

router.patch(
  "/users/:id",
  auth(userRole.ADMIN),
  AdminController.updateUserStatus,
);

export const AdminRouter: Router = router;

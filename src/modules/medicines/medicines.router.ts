import express, { Router } from "express";
import { medicinesController } from "./medicines.controller";
import auth, { userRole } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(userRole.SELLER), medicinesController.addMedicine);
router.get("/", medicinesController.getAllMedicines);
router.get("/:id", medicinesController.getMedicineById);
export const medicinesRouter: Router = router;

import express from "express";
import { medicinesController } from "./medicines.controller.js";
import auth, { userRole } from "../../middlewares/auth.js";
const router = express.Router();
router.post("/", auth(userRole.SELLER), medicinesController.addMedicine);
router.get("/", medicinesController.getAllMedicines);
router.get("/:id", medicinesController.getMedicineById);
router.put("/:id", auth(userRole.SELLER), medicinesController.updateMedicine);
router.delete("/:id", auth(userRole.SELLER), medicinesController.deleteMedicine);
export const medicinesRouter = router;
//# sourceMappingURL=medicines.router.js.map
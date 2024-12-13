import { Router } from "express";
import templateController from "../../controllers/templateController.js";

const router = Router();

// Create Template Route
router.post("/create", templateController.createTemplate);

// Get Template by ID Route
router.get("/:id", templateController.getTemplateById);

// Update Template Route
router.put("/:id", templateController.updateTemplate);

// Delete Template Route
router.delete("/:id", templateController.deleteTemplate);

export default router;

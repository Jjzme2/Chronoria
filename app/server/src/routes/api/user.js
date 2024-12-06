import { Router } from "express";
import userController from "../../controllers/userController.js";

const router = Router();

// Login Route
router.post("/login", userController.login);

// Create User Route (e.g., for admin or setup)
router.post("/create", userController.createUser);

export default router;

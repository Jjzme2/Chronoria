import { Router } from "express";
import userController from "../../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
	userController.getAll(req, res);
});

// Login Route
router.post("/login", userController.login);

// Create User Route (e.g., for admin or setup)
router.post("/create", userController.createUser);

// Logout Route
router.post("/logout", userController.logout);

router.post("/refresh-token", userController.refreshToken);

export default router;

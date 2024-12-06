import { Router } from "express";
import { generateToken } from "../../utils/jwtUtils.js";
import bcrypt from "bcrypt"; // For secure password hashing
import userController from "../../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
	// Check if the user is logged in, and if not redirect to the login page
	if (!req.user) {
		return res.redirect("/devcenter/login");
	}

	res.render("index", { title: "Developer Dashboard" });
});

// Login routes
router.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

// Register routes
router.get("/register", (req, res) => {
	res.render("register", { title: "Register" });
});

// Posts

router.post("/login", userController.login);

router.post("/register", userController.createUser);

router.post("/logout", userController.logout);

export default router;

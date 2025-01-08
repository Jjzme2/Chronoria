import { Router } from "express";


// Controllers
import userController from "../../controllers/userController.js";
import classController from "../../controllers/classController.js"
import characterController from "../../controllers/characterController.js";



const router = Router();

router.get("/", (req, res) => {
	// Check if the user is logged in, and if not redirect to the login page
	if (!req.user) {
		return res.redirect("/devcenter/login");
	}

	res.render("index", { title: "Developer Dashboard" });
});

// *Testing and Gets
router.get("/getUsers", (req, res) => {
	userController.getAll(req, res);
})

router.get("/getClasses", (req, res) => {
	classController.getAll(req, res);
})

router.get("/getCharacters", (req, res) => {
	characterController.getAll(req, res);
})


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

import { Router } from "express";
import { generateToken } from "../../utils/jwtUtils.js";
import bcrypt from "bcrypt"; // For secure password hashing

const router = Router();

router.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Query user from the database
		const result = await pool.query(
			`
      SELECT u.id, u.username, u.password, ar.name AS application_role
      FROM users u
      LEFT JOIN application_roles ar ON u.application_role = ar.id
      WHERE u.username = $1 AND u.active = TRUE
      `,
			[username]
		);

		const user = result.rows[0];
		if (!user) {
			return res
				.status(401)
				.json({ error: "Invalid username or password" });
		}

		// Check password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res
				.status(401)
				.json({ error: "Invalid username or password" });
		}

		// Check role permissions
		if (user.application_role !== "developer") {
			return res.status(403).json({ error: "Access denied" });
		}

		// Generate JWT
		const token = generateToken({
			id: user.id,
			username: user.username,
			application_role: user.application_role,
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;

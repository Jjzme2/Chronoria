import { Router } from "express";

const router = Router();

router.get("/example", (req, res) => {
	res.json({ message: "This is a route in the API category." });
});

export default router;

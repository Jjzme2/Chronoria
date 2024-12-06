import { Router } from "express";
import devRoutes from "./dev/main.js";

// import apiRoutes from "./api/main.js";
import userRoutes from "./api/user.js";

const router = Router();

// Aggregate routes
router.use("/devcenter", devRoutes);
// router.use("/api", apiRoutes);
router.use("/api/user", userRoutes);

export default router;

import { Router } from "express";
import devRoutes from "./dev/main.js";
import apiRoutes from "./api/main.js";

const router = Router();

// Aggregate routes
router.use("/devcenter", devRoutes);
router.use("/api", apiRoutes);

export default router;

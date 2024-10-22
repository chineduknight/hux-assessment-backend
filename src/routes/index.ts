import { Router } from "express";

import userRoutes from "./userRoutes";
import protectedRoute from "./protected";
const router = Router();

// Mount routers
router.use("/users", userRoutes);
router.use("/", protectedRoute);

export default router;

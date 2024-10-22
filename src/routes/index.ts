import { Router } from "express";

import userRoutes from "./userRoutes";
import protectedRoute from "./protected";
import contactRoutes from "./contactRoutes";
const router = Router();

// Mount routers
router.use("/", protectedRoute);
router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);

export default router;

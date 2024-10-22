import { Router } from "express";

import userRoutes from "./userRoutes";
const router = Router();

// Mount routers
router.use("/users", userRoutes);

export default router;

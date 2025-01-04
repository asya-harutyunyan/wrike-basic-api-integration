import tasksRoutes from "./tasks.routes";
import express from "express";

const router = express.Router();
router.use("/tasks", tasksRoutes);

export default router;

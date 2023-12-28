import express from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import {
    getHabitsController,
    updateHabitController,
    deleteAllHabitsController,
    deleteSpecificHabitController,
    addHabitController,
    addHabitDateController,
} from "../controllers/habitController"; // Import custom habit controller functions

const router = express.Router();

// Define routes for handling habits
router.get("/habits/get", authenticateUser, getHabitsController);
router.put("/habits/update/:id", updateHabitController);
router.delete("/habits/deleteAll", deleteAllHabitsController);
router.delete("/habits/delete/:id", deleteSpecificHabitController);
router.post("/habits/add", authenticateUser, addHabitController);
router.post("/habits/add-date/:id", authenticateUser, addHabitDateController);

export default router;

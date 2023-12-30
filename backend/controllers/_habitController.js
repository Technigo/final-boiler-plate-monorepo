// Import necessary modules
import { HabitModel } from "../models/HabitModel";

// Controller function to get all habits
export const getHabitsController = async (req, res) => {
    try {
        const habits = await HabitModel.find({ userId: req.user._id });
        res.json({ success: true, habits });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to update a habit by ID
export const updateHabitController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedHabit = await HabitModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        res.json({ success: true, habit: updatedHabit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to delete all habits
export const deleteAllHabitsController = async (req, res) => {
    try {
        await HabitModel.deleteMany({ userId: req.user._id });
        res.json({ success: true, message: "All habits deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to delete a specific habit by ID
export const deleteSpecificHabitController = async (req, res) => {
    try {
        const { id } = req.params;
        await HabitModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Habit deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to add a new habit
export const addHabitController = async (req, res) => {
    try {
        const { name } = req.body;
        const newHabit = new HabitModel({ name, userId: req.user._id });
        await newHabit.save();
        res.status(201).json({ success: true, habit: newHabit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to add a date to a habit
export const addHabitDateController = async (req, res) => {
    try {
        const { id } = req.params;
        const habit = await HabitModel.findById(id);
        habit.dates.push(new Date());
        await habit.save();
        res.json({ success: true, message: "Date added to habit" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// bookingController.js
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import { BookingModel } from "../models/BookingModel";

// DELETE all bookings
export const deleteAllBookingController = asyncHandler(async (req, res) => {
    const accessToken = req.header("Authorization");
    const userFromStorage = await UserModel.findOne({
        accessToken: accessToken,
    });
    await BookingModel.deleteMany({ user: userFromStorage })
        .then((result) =>
            res.json({
                message: "All bookings deleted",
                deletedCount: result.deletedCount,
            })
        )
        .catch((err) => res.status(500).json(err));
});

// DELETE booking by its ID
export const deleteSpecificBookingController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await BookingModel.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.json({
                    message: "Booking deleted successfully",
                    deletedBooking: result,
                });
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        })
        .catch((err) => res.status(500).json(err));
});

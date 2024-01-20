import express from "express"
import DogModel from "../models/DogModel.js"
import asyncHandler from "express-async-handler"
import { authenticateUser } from "../middleware/authenticateUser.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

// Get the complete list of dogs
router.get(
    "/findDogs", async (req, res) => {
    try {
      const dogs = await DogModel.find();
      res.json(dogs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get the dogs a specific user has added
/* router.get(
    "/yourDogs",
    authenticateUser,
    asyncHandler(async (req, res) => {
        const accessToken = req.header('Authorization')
        const userFromStorage = await UserModel.findOne({ accessToken: accessToken })
        await DogModel.find({ user: userFromStorage })
            .sort("-createdAt")
            .then((result) => res.json(result))
            .catch((error) => res.json(error))
    })
) */

// Add dogs to the database
router.post(
    "/addDogs",
    authenticateUser,
    asyncHandler(async (req, res) => {
        try {
            const { name, age, special_adoption, size, organisation } = req.body.dog;
            const accessToken = req.header('Authorization')
            const userFromStorage = await UserModel.findOne({ accessToken: accessToken })
            const newDog = new DogModel({
                name,
                age,
                special_adoption,
                size,
                organisation,
                user: userFromStorage._id
            })

            await newDog.save()
            res.json(newDog)

        } catch (error) {
            console.error(error); // Log the error to the console for debugging

            // Respond with a more informative error message
            res.status(500).json({
                success: false,
                response: "Failed to add a new dog. Please try again later."
            });
            /* res.status(500).json(error) */
        }
    })
)

// Delete a dog from the database
/* router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await DogModel.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.json({
                    message: "Dog deleted from Rescue Helper",
                    deleteDog: result
                })
            } else {
                res.status(404).json({ message: "Dog not found" })
            }
        })
        .catch((err) => res.status(500).json(err))
}); */

export default router
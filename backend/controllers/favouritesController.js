import { FavouriteModel } from "../models/favouriteModel.js";
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET ALL FAVOURITES ---------------------------------------------
const getFavourites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const accessToken = req.header("Authorization");
    // Verify accessToken and find user
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });

    if (!userFromStorage) {
      return res
        .status(401)
        .json({ message: "Unauthorized access or invalid token" });
    }
    console.log("User ID:", userFromStorage._id)

  try {
    const favourites = await FavouriteModel.findOne({  user: userFromStorage._id }).populate(
      "likedPlants"
    );
  console.log("Favourites:", favourites)

    res.status(200).json(favourites.likedPlants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
});

const addFavourite = asyncHandler(async (req, res) => {

  try {
    const { _id } = req.body;
    const plantID = _id;
    const accessToken = req.header("Authorization");
    // Verify accessToken and find user
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });
    if (!userFromStorage) {
      return res
        .status(401)
        .json({ message: "Unauthorized access or invalid token" });
    }

    let favourite = await FavouriteModel.findOne({ user: userFromStorage._id });

    console.log("FAVOURITE:", favourite)
    if (!favourite) {
      // If no favourite list exists for this user, create a new one
      favourite = new FavouriteModel({
        user: userFromStorage._id,
        likedPlants: [],
      });
    }
    console.log("Received plantID:", plantID);
    // Check for duplicate plantID
    if (plantID && !favourite.likedPlants.includes(plantID)) {
      console.log("Before Adding:", favourite.likedPlants);
      favourite.likedPlants.push(plantID);
      console.log("After Adding:", favourite.likedPlants);
    } else {
      console.log("HELLO")
      return res.status(400).json({ message: "Invalid plantID or plant already in favourites" });
    }

    await favourite.save();
    res.status(200).json({ message: "Plant added to favourites." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred: " + error.message });
  }
});

const removeFavourite = asyncHandler (async (req, res) => {
  try {
    const { _id } = req.body;
    const plantID = _id;
    const accessToken = req.header("Authorization");

    // Verify accessToken and find user
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });

    if (!userFromStorage) {
      return res
        .status(401)
        .json({ message: "Unauthorized access or invalid token" });
    }

    let favourite = await FavouriteModel.findOne({ user: userFromStorage._id });

    if (!favourite || !favourite.likedPlants.includes(plantID)) {
      return res.status(400).json({ message: "Plant not found in favourites" });
    }

    // Remove the plantID from the likedPlants array
    favourite.likedPlants = favourite.likedPlants.filter(
      (existingPlantID) => existingPlantID !== plantID
    );

    await favourite.save();
    res.status(200).json({ message: "Plant removed from favourites." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred: " + error.message });
  }

})

export { addFavourite, getFavourites, removeFavourite };

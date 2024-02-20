import { PlantModel } from "../models/plantModel.js";
import asyncHandler from "express-async-handler";

// GET ALL PLANTS ---------------------------------------------
const allPlants = asyncHandler(async (req, res) => {
  const plants = await PlantModel.find({});

  // If there are plants, return them as a JSON object.
  if (plants) {
    res.json(plants);
  } else {
    return res.status(404).json({ message: "No plants found" });
  }
});

// GET A SINGLE PLANT BY MONGODB OBJECT ID ---------------------------------------------
const singlePlant = asyncHandler(async (req, res) => {
  const plant = await PlantModel.findById(req.params.id);

  // If there is a plant with provided ID, return it as a JSON object.
  if (plant) {
    res.json(plant);
  } else {
    return res.status(404).json({ message: "Plant not found" });
  }
});

// BY CATEGORY ---------------------------------------------
// GET CLIMBING PLANTS ---------------------------------------------
const climbingPlants = asyncHandler(async (req, res) => {
  const climbing = await PlantModel.find({ category_type: "climbing" });

  if (climbing.length > 0) {
    res.json(climbing);
  } else {
    return res
      .status(404)
      .json({ message: "No plants found for this category." });
  }
});

// GET SHADY PLANTS ---------------------------------------------
const shadyPlants = asyncHandler(async (req, res) => {
  const shady = await PlantModel.find({ category_type: "shade" });

  if (shady.length > 0) {
    res.json(shady);
  } else {
    return res
      .status(404)
      .json({ message: "No plants found for this category." });
  }
});

// GET POPULAR PLANTS ---------------------------------------------
const popularPlants = asyncHandler(async (req, res) => {
  const popular = await PlantModel.find({ category_type: "popular" });

  if (popular.length > 0) {
    res.json(popular);
  } else {
    return res
      .status(404)
      .json({ message: "No plants found for this category." });
  }
});

// GET EASY PLANTS ---------------------------------------------
const easyPlants = asyncHandler(async (req, res) => {
  const easy = await PlantModel.find({
    "careDetails.care_level": "Easy",
  });

  if (easy.length > 0) {
    res.json(easy);
  } else {
    return res
      .status(404)
      .json({ message: "No plants found for this category." });
  }
});

// GET PET-FRIENDLY PLANTS ---------------------------------------------
const petFriendlyPlants = asyncHandler(async (req, res) => {
  const petFriendly = await PlantModel.find({ category_type: "pet-friendly" });

  if (petFriendly.length > 0) {
    res.json(petFriendly);
  } else {
    return res
      .status(404)
      .json({ message: "No plants found for this category." });
  }
});

// GET PLANTS BY CATEGORY ---------------------------------------------

// GET PLANTS BY SEARCH ---------------------------------------------

// GET PLANTS BY FILTER ---------------------------------------------

// GET PLANTS BY PRICE ---------------------------------------------

export {
  allPlants,
  singlePlant,
  climbingPlants,
  shadyPlants,
  popularPlants,
  easyPlants,
  petFriendlyPlants,
};

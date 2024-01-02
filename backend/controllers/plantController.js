import { PlantModel } from "../models/plantModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const allPlants = asyncHandler(async (req, res) => {
  const plants = await PlantModel.find({});

  if (plants) {
    res.json(plants);
  } else {
    return res.status(404).json({ message: "No plants found" });
  }
});

const singlePlant = asyncHandler(async (req, res) => {
  const plant = await PlantModel.findOne({ plantID: req.params.plantID });
  if (plant) {
    res.json(plant);
  } else {
    return res.status(404).json({ message: "Plant not found" });
  }
});

export {
  allPlants,
  singlePlant,
  // climbingPlants,
  // shadyPlants,
  // PopularPlants,
  // easyPlants,
  // petFriendlyPlants,
};

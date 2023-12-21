import { PlantModel } from "../models/PlantModel";

import asyncHandler from "express-async-handler";

// desc: Get all plants
// route: /get
// access: Public
export const getPlantsController = asyncHandler(async (req, res) => {
  try {
    const allPlants = await PlantModel.find();

    if (allPlants.length > 0) {
      res.json(allPlants);
    } else {
      res.status(404).json({ error: "No popular plants found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// desc: Get single plant
// route: /get
// access: Public
export const getPlantController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await PlantModel.findOne({ _id: id })
    .then((plant) => {
      if (plant) {
        res.json(plant);
      } else {
        res.status(500).json({ error: "Plant not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Something went wrong" });
    });
});

// desc: Get popular plants
// route: /get
// access: Public
export const getPopularPlantsController = asyncHandler(async (req, res) => {
  try {
    const popularPlants = await PlantModel.find({ category_type: "popular" });

    if (popularPlants.length > 0) {
      res.json(popularPlants);
    } else {
      res.status(404).json({ error: "No popular plants found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Somthing went wrong" });
  }
});

// desc: Get pet-friendly plants
// route: /get
// access: Public
export const getPetFriendlyPlantsController = asyncHandler(async (req, res) => {
  await PlantModel.find({ category_type: "pet-friendly" })
    .then((petFriendlyPlants) => {
      if (petFriendlyPlants.length > 0) {
        res.json(petFriendlyPlants);
      } else {
        res.status(404).json({ error: "No pet-friendly plants found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "Something went wrong with finding pet-friendly plant",
      });
    });
});

// desc: Get low-maintanence plants
// route: /get
// access: Public
export const getEasyPlantsController = asyncHandler(async (req, res) => {
  try {
    const easyPlants = await PlantModel.find({
      "careDetails.care_level": "Easy",
    });

    if (easyPlants.length > 0) {
      res.json(easyPlants);
    } else {
      res.status(404).json({ error: "No easy plants found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Somthing went wrong when searching for easy plants" });
  }
});

// desc: Get shade-loving plants
// route: /get
// access: Public

export const getShadyPlantsController = asyncHandler(async (req, res) => {
  try {
    const shadyPlants = await PlantModel.find({ category_type: "shade" });

    if (shadyPlants.length > 0) {
      res.json(shadyPlants);
    } else {
      res.status(404).json({ error: "No shady-loving plants found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Somthing went wrong when searching for shadeloving plants",
      });
  }
});

// desc: Get climbing plants
// route: /get
// access: Public

export const getClimbingPlantsController = asyncHandler(async (req, res) => {
  try {
    const climbingPlants = await PlantModel.find({ category_type: "climbing" });

    if (climbingPlants.length > 0) {
      res.json(climbingPlants);
    } else {
      res.status(404).json({ error: "No climbing plants found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Somthing went wrong when searching for climbing plants",
      });
  }
});

import { PlantModel } from "../models/PlantModel";

import asyncHandler from "express-async-handler"

// desc: Get all plants
// route: /get  
// access: Public
export const getPlantsController = asyncHandler(async (req, res) => {
    await PlantModel.find()
    .then((plants) => {
        if (plants.length > 0) {
            res.json(plants)
        } else {
            res.status(404).json({ error: "No plants found"})
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "Something went wrong"})
    })
})

// desc: Get single plant
// route: /get
// access: Public
export const getPlantController = asyncHandler(async (req, res) => {
    const { id } = req.params
    await PlantModel.findOne({ _id: id})
    .then((plant) => {
        if (plant) {
            res.json(plant)
        } else {
            res.status(500).json({ error: "Plant not found"})
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "Something went wrong"})
    })
})

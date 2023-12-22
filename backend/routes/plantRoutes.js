import express from "express";
import {
  getPlantsController,
  getPlantController,
  getPopularPlantsController,
  getPetFriendlyPlantsController,
  getEasyPlantsController,
  getShadyPlantsController,
  getClimbingPlantsController,
} from "../controllers/plantController";

const router = express.Router();
const listEndpoints = require("express-list-endpoints");

router.get("/", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json({ endpoints });
});

router.get("/plants/climbing", getClimbingPlantsController);

router.get("/plants/shady", getShadyPlantsController);

router.get("/plants/easy", getEasyPlantsController);

router.get("/plants/popular", getPopularPlantsController);

router.get("/plants/pet-friendly", getPetFriendlyPlantsController);

router.get("/plants/:id", getPlantController);

router.get("/plants", getPlantsController);

module.exports = router;

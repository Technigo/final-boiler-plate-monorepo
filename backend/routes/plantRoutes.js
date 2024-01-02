import express from "express"; // Imports the express package.

import {
  allPlants,
  singlePlant,
  climbingPlants,
  shadyPlants,
  popularPlants,
  easyPlants,
  petFriendlyPlants,
} from "../controllers/plantController.js"; // Imports the controller functions.

const router = express.Router(); // Creates a new router object.

// ROUTES ---------------------------------------------

router.get("/", allPlants);
router.get("/:id", singlePlant);
router.get("/category/climbing", climbingPlants);
router.get("/category/shady", shadyPlants);
router.get("/category/popular", popularPlants);
router.get("/category/easy", easyPlants);
router.get("/category/pet-friendly", petFriendlyPlants);

export default router; // The router object is exported.

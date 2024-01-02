import express from "express"; // Imports the express package.
import {
  allPlants,
  singlePlant,
  //   climbingPlants,
  //   shadyPlants,
  //   PopularPlants,
  //   easyPlants,
  //   petFriendlyPlants,
} from "../controllers/plantController.js"; // Imports the controller functions.

const router = express.Router(); // Creates a new router object.

// ROUTES ---------------------------------------------

router.get("/", allPlants);
router.get("/:plantID", singlePlant);
// router.get("/climbing", climbingPlants);
// router.get("/shady", shadyPlants);
// router.get("/popular", PopularPlants);
// router.get("/easy", easyPlants);
// router.get("/pet-friendly", petFriendlyPlants);

export default router; // The router object is exported.

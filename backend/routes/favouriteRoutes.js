import express from "express";

import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favouritesController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router(); // Creates a new router object.

router.post("/add-to-favourites", userVerification, addFavourite);
router.get("/get-my-favourites", userVerification, getFavourites);
router.delete("/remove-favourite", userVerification, removeFavourite);

export default router;

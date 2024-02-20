import express from "express";

import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favouritesController.js";

const router = express.Router(); // Creates a new router object.

router.post("/add-to-favourites", addFavourite);
router.get("/get-my-favourites", getFavourites);
router.delete("/remove-favourite", removeFavourite);

export default router;

import express from "express";

import {
  addFavourite,
  getFavourites,
  removeFavourite
} from "../controllers/favouritesController.js";
import { authenticateUser, authorizedAdmin } from "../middlewares/auth.js";

const router = express.Router(); // Creates a new router object.

router.post("/add-to-favourites", authenticateUser, addFavourite);

router.get("/get-my-favourites", authenticateUser, getFavourites);

router.delete("/remove-favourite", authenticateUser, removeFavourite);

export default router;

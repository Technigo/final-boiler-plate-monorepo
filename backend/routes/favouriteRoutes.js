import express from "express"

import { addFavourite, getFavourites } from "../controllers/favouritesController.js"

const router = express.Router(); // Creates a new router object.

router.post("/add-to-favourites", addFavourite)

router.get("/get-my-favourites", getFavourites)

export default router; 
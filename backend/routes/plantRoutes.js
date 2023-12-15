import express from "express";
import { getPlantsController, getPlantController } from "../controllers/plantController"

const router = express.Router()

router.get("/plants", getPlantsController)

router.get("/plants/:id", getPlantController)

module.exports = router
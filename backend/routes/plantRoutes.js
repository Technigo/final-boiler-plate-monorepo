import express from "express";
import {
  getPlantsController,
  getPlantController,
} from "../controllers/plantController";

const router = express.Router();
const listEndpoints = require("express-list-endpoints")

router.get("/", (req, res) => {
  const endpoints = listEndpoints(router)
  res.json({ endpoints })
})

router.get("/plants", getPlantsController);

router.get("/plants/:id", getPlantController);

module.exports = router;

import express, { response } from "express";
import https from "https";
import { mapModel } from "../models/mapModel";

// Create an instance of the Express router
const router = express.Router();

// Define a route for handling GET requests
router.get("/geocode", (req, res) => {
  const address = req.query.address;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const request = https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      res.send(JSON.parse(data));
    });
  });
  response.on("error", (error) => {
    console.error(error);
    res.status(500).send("Error occurred while fetching geocode data");
  });
});

router.post("/story", async (req, res) => {
  try {
    const { title, story, latitude, longitud } = req.body;

    const newStory = new mapModel({
      title,
      story,
      location: {
        type: "Point",
        coordinates: [longitud, latitude],
      },
    });
    await newStory.save();
    res.status(201).send("Story saved succesfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occured while saving the story");
  }
});

// Export the router for use in the main application
export default router;

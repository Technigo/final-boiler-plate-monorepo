import express, { response } from "express";
import https from "https";

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
});
response.on("error", (error) => {
  console.error(error);
  res.status(500).send("Error occurred while fetching geocode data");
});

// Export the router for use in the main application
export default router;

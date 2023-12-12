// Import the necessary modules and functions
import express from "express";
//import Stories from "../stories.json";
import listEndpoints from "express-list-endpoints";
import { StoryModel } from "../models/StoryModel";

// Create an instance of the Express router
const router = express.Router();

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//route to see all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await StoryModel.find().sort({ createdAt: -1 }); // Fetch all stories and sort them by creation date
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route for post a story
router.post("/stories", async (req, res) => {
  const newStory = new StoryModel({
    heading: req.body.heading,
    content: req.body.content,
    ranking: req.body.ranking, // This can be optional as it has a default value
  });

  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//route for rank/like
router.put("/stories/:id/rank", async (req, res) => {
  const storyId = req.params.id;
  const newRanking = req.body.ranking;

  if (newRanking === undefined) {
    return res.status(400).json({ message: "Ranking not provided" });
  }

  try {
    const updatedStory = await StoryModel.findByIdAndUpdate(
      storyId,
      { ranking: newRanking },
      { new: true } // Returns the updated document
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for various CRUD operations on tasks. It includes middleware for user authentication and associates each route with the corresponding controller function. These routes define the API endpoints for managing tasks within the application.

// Import the necessary modules and functions
import express from "express";

import listEndpoints from "express-list-endpoints";
import { mapStoryModel } from "../models/mapStoryModel";

// Create an instance of the Express router
const router = express.Router();

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//route to see all stories with optional sorting
router.get("/stories", async (req, res) => {
  const { category, sortBy } = req.query;
  let query = {};
  let sortOption = { createdAt: -1 }; // Default sorting

  // Filter by category if it's provided
  if (category) {
    query.category = category;
  }

  // Change sorting based on the query parameter
  if (sortBy === "ranking") {
    sortOption = { ranking: -1 }; // Sort by ranking in descending order
  }

  try {
    const stories = await mapStoryModel.find(query).sort(sortOption);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route for post a story
router.post("/stories", async (req, res) => {
  const { title, content, category, ranking, lat, lng, image } = req.body;
  const newStory = new mapStoryModel({
    title,
    content,
    category,
    ranking,
    location: { lat, lng },
    image,
  });

  try {
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// //route for rank/like
// router.put("/stories/:id/rank", async (req, res) => {
//   const storyId = req.params.id;
//   const newRanking = req.body.ranking;

//   if (newRanking === undefined) {
//     return res.status(400).json({ message: "Ranking not provided" });
//   }

//   try {
//     const updatedStory = await mapStoryModel.findByIdAndUpdate(
//       storyId,
//       { ranking: newRanking },
//       { new: true } // Returns the updated document
//     );

//     if (!updatedStory) {
//       return res.status(404).json({ message: "Story not found" });
//     }

//     res.json(updatedStory);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//route for rank/like
router.put("/stories/:id/rank", async (req, res) => {
  const storyId = req.params.id;

  try {
    const updatedStory = await mapStoryModel.findByIdAndUpdate(
      storyId,
      { $inc: { ranking: 1 } }, // Increment the ranking by 1
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

export default router;

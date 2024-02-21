// Import the necessary modules and functions
import express from "express";
import listEndpoints from "express-list-endpoints";
import { mapStoryModel } from "../models/mapStoryModel";
import { analyzeTextWithApiKey } from "../ApiComponents/contentAnalysis";
import { translateTextWithApiKey } from "../ApiComponents/contentTranslate";
import { connectDB } from "../config/db";

// Create an instance of the Express router
const router = express.Router();

// Endpoint to check server status
router.get("/server/status", async (req, res) => {
  try {
    // Attempt to connect to the database
    await connectDB();
    // If the database connection is successful, respond with status 200 (OK)
    res.sendStatus(200);
  } catch (error) {
    // If an error occurs during the connection attempt, respond with status 500 (Internal Server Error)
    console.error('Error checking server status:', error);
    res.sendStatus(500);
  }
});

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//route to see all stories with optional sorting
router.get("/stories", async (req, res) => {
  const { category, sortBy, language } = req.query;
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
    let stories = await mapStoryModel.find(query).sort(sortOption);

    // Check if translation is requested
    if (language) {
      // Translate each story content
      stories = await Promise.all(
        stories.map(async (story) => {
          const translatedText = await translateTextWithApiKey(
            story.content,
            language
          );
          return { ...story.toObject(), content: translatedText };
        })
      );
    }

    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to check if a story is in Swedish
const isStoryInSwedish = (text) => {
  const swedishCharacters = ["å", "ä", "ö"];
  return swedishCharacters.some((char) => text.includes(char));
};

//route for post a story
router.post("/stories", async (req, res) => {
  const { title, content, category, ranking, lat, lng, city, image } = req.body;
  console.log(req.body);

  try {
    if (!isStoryInSwedish(content)) {
      const analysisResult = await analyzeTextWithApiKey(content);
      if (analysisResult.documentSentiment.score < -0.5) {
        return res.status(400).json({ message: "Content is too negative" });
      }
    }
    // If content is acceptable, proceed to save the story
    const newStory = new mapStoryModel({
      title,
      content,
      category,
      ranking,
      location: { lat, lng },
      city,
      image,
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to retrieve a specific story by ID
router.get("/stories/:id", async (req, res) => {
  try {
    const storyId = req.params.id;
    const language = req.query.language;
    const story = await mapStoryModel.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (language && language !== "en") {
      // Translate story content if language is provided and is not English
      const translatedText = await translateTextWithApiKey(
        story.content,
        language
      );
      story.content = translatedText;
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

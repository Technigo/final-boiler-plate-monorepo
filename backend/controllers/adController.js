import { AdModel } from "../models/AdModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";
// Import cloudinary configuration
import cloudinary from "../config/cloudinaryConfig";

// desciption: Get Ads
// route: /getAllAds
// access: Public
export const getAllAdsController = asyncHandler(async (req, res) => {
  const userStorage = req.user;
  const allAds = await AdModel.find().populate("user", "username");
  res.status(200).json(allAds);
});

// desciption: Get Ads
// route: /getAds
// access: Prublic
export const getAdsController = asyncHandler(async (req, res) => {
  const userStorage = req.user;
  const ads = await AdModel.find({ user: userStorage })
    .sort("-createdAt")
    .populate("user", "username"); // Populate the user field

  res.json(ads);
});

// Description: Get a specific Ad by its ID
// Route: /getAd/:id
// Access: Public 
export const getAdByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  try {
    const ad = await AdModel.findById(id).populate("user", "username");
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ad", error: error.message });
  }
});

// Description: Get Ads by a specific User ID
// Route: /getAdsByUserId/:userId
// Access: Public (or Private if you want to restrict access)
export const getAdsByUserIdController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const ads = await AdModel.find({ user: userId })
    .sort("-createdAt")
    .populate("user", "username");
  res.json(ads);
});

// Description: Get Ads saved by a specific user
// Route: /getSavedAdsByUser/:userId
// Access: Public (or Private if you want to restrict access)
export const getSavedAdsByUserController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const savedAds = await AdModel.find({ savedBy: userId }).populate("user", "username");
    res.json(savedAds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved ads", error: error.message });
  }
});

// desciption: POST Ad
// route: /add
// access: Private
export const createAdController = asyncHandler(async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the entire request body
    console.log("req.file", req.file);
    // Extract the ad data from the request body
    const {
      title,
      description,
      product,
      quantity,
      unit,
      address,
      pickupDate,
      observation,
      available,
      tags,
    } = req.body;

    // Extract the accessToken from the request header key "Authorization"
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject

    //Find the user that matches the accessToken stored in the db
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });

    if (!userFromStorage) {
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    let imageUrl, imageId;
    try {
      // Upload the image file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.url;
      imageId = result.public_id; // or use req.file.filename for filename
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      return res
        .status(500)
        .json({
          message: "Error uploading image to Cloudinary.",
          error: uploadError,
        });
    }
    // Define var to pass new AD
    //wait for the save() operation to complete before sending back the response
    const newAd = new AdModel({
      title,
      description,
      product,
      quantity,
      unit,
      address,
      pickupDate,
      observation,
      image: imageUrl,
      imageId: imageId,
      user: userFromStorage,
    });

    const savedAd = await newAd.save();
    res.json(savedAd);
  } catch (error) {
    console.error(error); // Log the detailed error
    res.status(500).json({ message: "Internal server error", error });
  }
});

// desciption: POST to save an ad
// route: /savedAd
// access: Private
export const saveAdController = asyncHandler(async (req, res) => {
  const { adId } = req.body;
  const userId = req.user._id; // Assuming user's ID is available in req.user._id

  try {
    const ad = await AdModel.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Add userId to the savedBy array if not already present
    if (!ad.savedBy.includes(userId)) {
      ad.savedBy.push(userId);
      await ad.save();
    }

    res.status(200).json({ message: "Ad saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving ad", error: error.message });
  }
});

// desciption: PUT/PATCH a specific AD
// route: /update/:id
// access: Private
export const updateAdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = req.body;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    updateData.image = result.url;
    updateData.imageId = result.public_id;
  }

  const userFromStorage = await UserModel.findOne({
    accessToken: req.header("Authorization"),
  });

  if (!userFromStorage) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  AdModel.findByIdAndUpdate(id, updateData, { new: true })
    .then(updatedAd => res.json(updatedAd))
    .catch(err => res.status(500).json({ message: "Error updating ad.", error: err }));
});

// desciption: DELETE all ads
// route: /deleteAll
// access: Private
export const deleteAllAdsController = asyncHandler(async (req, res) => {
  const accessToken = req.header("Authorization");

  const userFromStorage = await UserModel.findOne({ accessToken });
  if (!userFromStorage) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  // Find all ads for the user
  const ads = await AdModel.find({ user: userFromStorage });

  // Iterate over all ads and delete associated images from Cloudinary
  for (const ad of ads) {
    await cloudinary.uploader.destroy(ad.imageId);
  }

  // After all images are deleted, delete the ads from the database
  const result = await AdModel.deleteMany({ user: userFromStorage });
  res.json({
    message: "All ads and associated images deleted",
    deletedCount: result.deletedCount,
  });
});

// desciption: DELETE AD by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificAdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ad = await AdModel.findById(id);
  if (!ad) {
    return res.status(404).json({ message: "Ad not found" });
  }

  try {
    // Delete the image from Cloudinary using the imageId
    await cloudinary.uploader.destroy(ad.imageId);

    // Then delete the ad from the database
    const result = await AdModel.findByIdAndDelete(id);
    res.json({
      message: "Ad and associated image deleted successfully",
      deletedAd: result,
    });
  } catch (err) {
    console.error("Error during ad deletion:", err);
    res
      .status(500)
      .json({ message: "Failed to delete ad and/or image", error: err });
  }
});

// desciption: DELETE saved AD by its ID
// route: /unsaveAd/:adId
// access: Private
export const unsaveAdController = asyncHandler(async (req, res) => {
  const { adId } = req.params; // Now expecting adId as a URL parameter
  const userId = req.user._id; // Assuming user's ID is available in req.user._id

  try {
    const ad = await AdModel.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Remove userId from the savedBy array
    ad.savedBy = ad.savedBy.filter(id => id.toString() !== userId.toString());
    await ad.save();

    res.status(200).json({ message: "Ad unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unsaving ad", error: error.message });
  }
});


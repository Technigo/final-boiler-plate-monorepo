import { AdModel } from "../models/AdModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";

// desciption: Get Ads
// route: /getAllAds
// access: Private
export const getAllAdsController = asyncHandler(async (req, res) => {
  const userStorage = req.user;
  const allAds = await AdModel.find().populate("user", "username");
  res.status(200).json(allAds);
});

// desciption: Get Ads
// route: /getAds
// access: Private
export const getAdsController = asyncHandler(async (req, res) => {
  const userStorage = req.user;
  const ads = await AdModel.find({ user: userStorage })
    .sort("-createdAt")
    .populate("user", "username"); // Populate the user field

  res.json(ads);
});

// desciption: POST Ad
// route: /add
// access: Private
export const createAdController = asyncHandler(async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the entire request body
    console.log("req.file", req.file);
    // Extract the ad data from the request body
    const { title, description, product, quantity, unit, address, pickupTime } = req.body;

    // Extract the accessToken from the request header key "Authorization"
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject

    //Find the user that matches the accessToken stored in the db
    const userFromStorage = await UserModel.findOne({ accessToken: accessToken });

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
      console.error('Cloudinary Upload Error:', uploadError);
      return res.status(500).json({ message: "Error uploading image to Cloudinary.", error: uploadError });
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
      pickupTime,
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


// desciption: PUT/PATCH a specific AD
// route: /update/:id
// access: Private
export const updateAdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // This contains the fields to be updated

  // Optionally, if you're updating the image, handle the image file upload and get the new image URL and ID
  if (req.file) {
    try {
      // Upload the new image file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.url;
      updateData.imageId = result.public_id;
    } catch (uploadError) {
      console.error('Cloudinary Upload Error:', uploadError);
      return res.status(500).json({ message: "Error uploading new image to Cloudinary.", error: uploadError });
    }
  }

  // Make sure to check that the user making the update is the owner of the ad
  const userFromStorage = await UserModel.findOne({ accessToken: req.header("Authorization") });
  if (!userFromStorage) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  // Update the ad with the new data
  AdModel.findByIdAndUpdate(id, updateData, { new: true }) // {new: true} will return the updated document
    .then((updatedAd) => {
      if (!updatedAd) {
        return res.status(404).json({ message: "Ad not found." });
      }
      res.json(updatedAd);
    })
    .catch((err) => res.status(500).json({ message: "Error updating ad.", error: err }));
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
    console.error('Error during ad deletion:', err);
    res.status(500).json({ message: "Failed to delete ad and/or image", error: err });
  }
});
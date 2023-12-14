import { AdModel } from "../models/AdModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";

// desciption: Get Ads
// route: /get
// access: Private
export const getAdsController = asyncHandler(async (req, res) => {
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userStorage = req.user;
  // Use the AdModel to find all ads associated with the logged-in user
  await AdModel.find({ user: userStorage })
    .sort("-createdAt")
    .then((result) => res.json(result)) // Respond with the found ads in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: POST Ad
// route: /add
// access: Private
export const addAdController = asyncHandler(async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the entire request body
    // Extract the ad data from the request body
    const { title, description, product, quantity, unit, address, pickupTime } = req.body;
    
    // Extract the accessToken from the request header key "Authorization"
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    
    //Find the user that matches the accessToken stored in the db
    const userFromStorage = await UserModel.findOne({accessToken: accessToken});
   
    // Define var to pass new AD
    //wait for the save() operation to complete before sending back the response
    const newAd = await new AdModel({
      title: title,
      description: description, 
      product: product,
      quantity: quantity,
      unit: unit,
      address: address,
      pickupTime: pickupTime,
      user: userFromStorage,
    }).save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific AD to mark it complete
// route: /update/:id"
// access: Private
export const updateAdController = asyncHandler(async (req, res) => {
  // Extract the ad ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use AdModel to find and update an Ad by its ID, marking it as sold
  // Use AdModel to delete all ads in the database of that specific user
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await AdModel.findByIdAndUpdate(
    { _id: id },
    { sold: true },
    { user: userFromStorage }
  )
    .then((result) => res.json(result)) // Respond with the updated ad in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all ads
// route: /deleteAll
// access: Private
export const deleteAllAdsController = asyncHandler(async (req, res) => {
  // Use AdModel to delete all ads in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await AdModel.deleteMany({ user: userFromStorage })
    .then((result) =>
      res.json({
        message: "All ads deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted ads
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE AD by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificAdController = asyncHandler(async (req, res) => {
  // Extract the ad ID from the request parameters
  const { id } = req.params;
  // Use AdModel to find and delete a ad by its ID
  await AdModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Ad deleted successfully",
          deletedAd: result,
        }); // Respond with a success message and the deleted Ad
      } else {
        res.status(404).json({ message: "Ad not found" }); // Respond with a 404 error if the AD is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});


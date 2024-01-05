import { FavouriteModel } from "../models/favouriteModel.js";
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET ALL FAVOURITES ---------------------------------------------
const getFavourites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const favourites = await FavouriteModel.findOne({ user: userId }).populate(
      "likedPlants"
    );

    res.status(200).json(favourites.likedPlants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
});

const addFavourite = asyncHandler(async (req, res) => {
  // const userId = req.user ? req.user._id : null;
  // if (!userId) {
  //   return res.status(401).json({ message: "No user"})
  // }


  // const { plantId } = req.body;
  

  // try {

  //   const user = await UserModel.findById(userId);
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found.' });
  //   }


  //   let favourites = await FavouriteModel.findOne({ user: userId });

  //   if (!favourites) {
  //     favourites = new FavouriteModel({ user: userId });
  //   }

  //   if (!favourites.likedPlants.includes(plantId)) {
  //     favourites.likedPlants.push(plantId);
  //   }

  //   await favourites.save();

  //   res.status(200).json({ message: "Plant added to favourites." });
  // } catch (error) {
  //   res.status(500).json({ message: "An error occurred." });
  // }
  try {
    // Extract the task data from the request body
    const { plantID } = req.body;
    console.log(plantID);
    // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });
    // Define var to pass new task
    const newFavourite = new FavouriteModel({
      likedPlants: plantID,
      user: userFromStorage,
    }).save();
    res.json(newFavourite);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { addFavourite, getFavourites };

// const getFavourites = asyncHandler(async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     const favourites = await FavouriteModel.find({ user: req.userId }).populate("likedPlants")

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     res.status(200).json(favourites);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong")
//   }
// })

// const addFavourite = asyncHandler(async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     const favourites = await FavouriteModel.find({ user: req.userId }).populate("likedPlants")

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const existingFavourite = await FavouriteModel.findOne({
//       user: req.userId,
//       likedPlants: req.body.plantID,
//     }
//     );

//     if (existingFavourite) {
//       return res.status(400).send("Plant is already in favourites");
//     }

//     const newFavourite = new FavouriteModel({ likedPlants: [req.body.plantID], user: req.userId, });
//     await newFavourite.save();

//     favourite.likedPlants.push(newFavourite._id);
//     await user.save();

//     res.status(201).json({ message: "Favourite added successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong");
//   }
// });

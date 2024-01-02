// import { FavouriteModel } from "../models/favouriteModel.js";
// import { UserModel } from "../models/userModel.js";
// import asyncHandler from "../utils/asyncHandler.js";

// const addFavourite = asyncHandler(async (req, res) => {
//   try {
//     const user = await UserModel.findbyId(req.userId).populate(favourites);

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const existingFavourite = user.favourites.find(
//       (fav) => fav.apiId === req.body.apiId
//     );

//     if (existingFavourite) {
//       return res.status(400).send("Plant is already in favourites");
//     }

//     const newFavourite = new Favourites({ apiId: req.body.apiId, like: true });
//     await newFavourite.save();

//     user.favourites.push(newFavourite);
//     await user.save();

//     res.status(201).json({ message: "Favourite added successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong");
//   }
// });


// export { addFavourite }


import { FavouriteModel } from "../models/favouriteModel.js";
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const getFavourites = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("favourites")

    if (!user) {
      return res.status(404).send("User not found"); 
    }

    res.status(200).json(user.favourites);

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong")
  }
})

const addFavourite = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate('favourites');

    if (!user) {
      return res.status(404).send("User not found");
    }

    const existingFavourite = user.favourites.find(
      (fav) => fav.apiId === req.body.apiId
    );

    if (existingFavourite) {
      return res.status(400).send("Plant is already in favourites");
    }

    const newFavourite = new FavouriteModel({ apiId: req.body.apiId, like: true });
    await newFavourite.save();

    user.favourites.push(newFavourite);
    await user.save();

    res.status(201).json({ message: "Favourite added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

export { addFavourite, getFavourites }
import mongoose from "mongoose";

const { Schema } = mongoose;

const favouriteSchema = new Schema({
  likedPlants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const FavouriteModel = mongoose.model("Favourite", favouriteSchema);

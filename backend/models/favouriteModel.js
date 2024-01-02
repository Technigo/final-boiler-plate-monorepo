import mongoose from "mongoose"; 

const { Schema } = mongoose;

const favouriteSchema = new Schema({
    apiId: {
        type: String
    },
    like: {
        type: Boolean,
        default: false
    }
})

export const FavouriteModel = mongoose.model("Favourite", favouriteSchema)

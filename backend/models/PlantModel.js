import mongoose from "mongoose";

const { Schema } = mongoose

const plantSchema = new Schema(
    {
        plantID: {
            type: Number, 
            required: true, 
            unique: true, 
        },
        plant_title: {
            type: String, 
            required: true, 
        }, 
        botanical_name: {
            type: String, 
            required: true, 
        },
        category_type: {
            type: String,
        },
        origin: {
            type: String, 
        },
        description: {
            type: String, 
        },
        height: {
            type: String,
        },
        poisonous_pets: {
            type: Boolean,
        },
        careDetails: {
          care_level: {
            type: String, 
          },
          watering: {
            type: String,
          },
          sunlight: {
            type: String, 
          },
        },
        images: {
          preview_url: {
            type: String,
          },
          full_size_url: {
            type: String,
          },
        },
        price: {
            type: Number,
            required: true, 
        },
        added_to_wishlist: {
            type: Boolean, 
        },
      }
)

export const PlantModel = mongoose.model("Plant", plantSchema)
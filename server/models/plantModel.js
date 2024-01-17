import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
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
  common_names: {
    type: Array,
    required: true,
  },
  category_type: {
    type: Array,
  },
  origin: {
    type: String,
  },
  description: {
    type: String,
  },
  fun_fact: {
    type: String,
  },
  height: {
    type: String,
  },
  careDetails: {
    care_description: {
      type: String,
    },
    care_level: {
      type: String,
    },
    watering: {
      type: String,
    },
    light: {
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
});

export const PlantModel = mongoose.model("Plant", plantSchema);
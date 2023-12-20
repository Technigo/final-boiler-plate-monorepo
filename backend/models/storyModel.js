// import mongoose from "mongoose";

// // Destructures the Schema class from the Mongoose library, allowing us to create a schema.
// const { Schema } = mongoose;

// export const storySchema = new Schema({
//   heading: {
//     type: String,
//     required: true,
//     minlength: 10,
//   },

//   content: {
//     type: String,
//     required: true,
//     minlength: 10,
//   },

//   category: {
//     type: String,
//     required: true,
//     enum: ["historical", "hearsay", "anecdote"],
//   },

//   ranking: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const StoryModel = mongoose.model("Story", storySchema);

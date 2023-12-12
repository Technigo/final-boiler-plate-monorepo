import mongoose from 'mongoose';

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
  },
  IMDBRating: {
    type: Number,
  },
});

export const MovieModel = mongoose.model('Movie', movieSchema);
export default MovieModel;

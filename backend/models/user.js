
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add a simple email validation
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  // favorites: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Favorites', // Reference to the Playground model
  //   },
  // ],

  // completedChallenges: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Challenge' }],


  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

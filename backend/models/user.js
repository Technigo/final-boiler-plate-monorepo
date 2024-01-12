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
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  completedChallenges: [
    {
      type: Number,
      ref: 'Challenge',
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  challengeId: {
    type: Number,
    required: true,
    unique: true,
  },
      
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false
  },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
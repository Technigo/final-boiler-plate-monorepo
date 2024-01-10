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

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // }

});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
challengeId: {
    type: String, // You can choose the type that fits your needs (String, Number, etc.)
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
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
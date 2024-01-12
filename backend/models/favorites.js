//This model is not used in the project at the moment. It is a model that was intended to be used to let the user mark playgrounds as favorites. 

const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    apiId: {
        type: String
    },

    like: {
        type: Boolean,
        default: false
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: () => new Date()
    }

});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites
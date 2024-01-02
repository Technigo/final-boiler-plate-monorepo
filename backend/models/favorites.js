const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    apiId: {
        type: String
    },

   // name: {
       // type: String
    //},
    
    like: {
        type: Boolean,
        default: false
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites
const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    primaryLiquor: String,
    allLiquors: [String],
    ingredients: [String],
    instructions: String,
    category: String,
    color: String,
    ingredientsCount: Number,
    creator: String,
    InspiredByCreator: [String],
    occasion: [String],
    difficulty: String,
    flavorProfile: [String],
    imageUrl: String, // THIS IS WHERE I NEED A WAY TO UPLOAD IMAGES FROM DEVICES VIA FRONTEND (ADMIN ONLY ACCES)
    servings: Number,
    prepTime: String,
    drinkware: String,
    strength: String,
    tags: [String],
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cocktail', cocktailSchema);

// eksempel:
// {
//     "name": "Margarita",
//     "primaryLiquor": "Tequila",
//      "allLiquors": ["Tequila", "Triple Sec"],
//     "ingredients": ["Tequila", "Triple Sec", "Lime Juice", "Salt"],
//     "instructions": "Rub the rim of the glass with the lime slice to make the salt stick to it...",
//     "category": "Classic",
//     "color": "Green",
//     "ingredientsCount": 4,
//     "creator": "Eva", //(Ine, Guest, Mirela ol)
//     "occasion": ["Summer", "Beach Party"],
//     "difficulty": "Easy",
//     "flavorProfile": "Sour",
//     "imageUrl": "path/to/image.jpg",
//     "servings": 4,
//     "prepTime": "7 minutes",
//     "drinkware": "Cocktail Glass",
//     "strength": "Strong",
//     "tags": ["Classic", "Strong"]
//   }

const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
    name: String,
    primaryLiquor: String,
    ingredients: [String],
    instructions: String,
    category: String,
    color: String,
    ingredientsCount: Number,
    creator: String,
    occasion: [String],
    difficulty: String,
    flavorProfile: String,
    imageUrl: String,
    servings: Number,
    prepTime: String,
    drinkware: String,
    strength: String,
    tags: [String]
});

module.exports = mongoose.model('Cocktail', cocktailSchema);


//Set Up Route Handlers:
// In your server.js file or a separate routes directory, define routes for handling CRUD operations.
// Use Express to set up routes like GET /cocktails, POST /cocktails, etc.



// eksempel:
// {
//     "name": "Margarita",
//     "primaryLiquor": "Tequila",
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
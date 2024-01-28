import mongoose from 'mongoose';

const cocktailSchema = new mongoose.Schema({
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
    imageUrl: String, // URL of the image
    imagePublicId: String, // Public ID of the image in Cloudinary
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

export default mongoose.model('Cocktail', cocktailSchema);


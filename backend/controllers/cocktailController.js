
import Cocktails from '../models/Cocktails';
import cloudinary from 'cloudinary';

export const getCocktailsController = async (req, res) => {
    try {
        // Extracting query parameters
        const { search, filter } = req.query;

        // Initialize the Mongoose query
        let query = Cocktails.find();

        // Filter logic: Apply filters based on the 'filter' query parameter
        if (filter) {
            const [filterCategory, value] = filter.split(':');
            if (filterCategory && value) {
                switch (filterCategory.toLowerCase()) {
                    case 'liquor':
                        query = query.where({ allLiquors: new RegExp(value, 'i') });
                        break;
                    case 'color':
                        query = query.where({ color: new RegExp(value, 'i') });
                        break;
                    case 'occasion':
                        query = query.where({ occasion: new RegExp(value, 'i') });
                        break;
                    case 'flavorprofile':
                        query = query.where({ flavorProfile: new RegExp(value, 'i') });
                        break;
                    // Add more cases as needed for other filters
                }
            }
        }

        // Search logic: Apply a search filter if 'search' query parameter is provided
        if (search) {
            const regexSearch = new RegExp('\\b' + search + '\\b', 'i');
            query = query.and([{
                $or: [
                    { name: regexSearch },
                    { primaryLiquor: regexSearch },
                    { allLiquors: { $in: [regexSearch] } },
                    { ingredients: { $in: [regexSearch] } },
                    { instructions: regexSearch },
                    { category: regexSearch },
                    { color: regexSearch },
                    { occasion: { $in: [regexSearch] } },
                    { difficulty: regexSearch },
                    { flavorProfile: regexSearch },
                    { prepTime: regexSearch },
                    { drinkware: regexSearch },
                    { strength: regexSearch },
                    { tags: { $in: [regexSearch] } },
                    { creator: regexSearch },
                    { description: regexSearch },
                    { InspiredByCreator: { $in: [regexSearch] } },
                    // Add more fields as needed
                ]
            }]);
        }

        // Debug: Log the final query being executed
        console.log("Executing query:", query.getQuery());

        // Execute the query and sort the results
        const cocktails = await query.sort({ name: 1 });

        // Send the query results as a JSON response
        res.json(cocktails);

    } catch (error) {
        // Error handling: Log the error and send a 500 Internal Server Error response
        console.error("Error caught in getCocktailsController:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single cocktail by ID
export const getCocktailByIdController = async (req, res) => {
    try {
        const cocktail = await Cocktails.findById(req.params.id);
        if (!cocktail) {
            return res.status(404).send('Cocktail not found');
        }
        res.json(cocktail);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Create a new cocktail with image upload
export const addCocktailController = async (req, res) => {
    // Check admin role
    if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        // Parse array fields from JSON strings if they exist
        if (req.body.allLiquors) {
            req.body.allLiquors = JSON.parse(req.body.allLiquors);
        }
        if (req.body.ingredients) {
            req.body.ingredients = JSON.parse(req.body.ingredients);
        }
        if (req.body.InspiredByCreator) {
            req.body.InspiredByCreator = JSON.parse(req.body.InspiredByCreator);
        }
        if (req.body.occasion) {
            req.body.occasion = JSON.parse(req.body.occasion);
        }
        if (req.body.flavorProfile) {
            req.body.flavorProfile = JSON.parse(req.body.flavorProfile);
        }
        if (req.body.tags) {
            req.body.tags = JSON.parse(req.body.tags);
        }

        // Add time and date to the recipe
        req.body.date = new Date();

        // Create a new cocktail document with the parsed request body
        const newCocktail = new Cocktails(req.body);
        await newCocktail.save();
        res.status(201).json(newCocktail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Updates cocktails (with or without updating picture)
export const updateCocktailController = async (req, res) => {
    //check admin role
    if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can update cocktails.' });
    }

    try {
        const cocktailId = req.params.id;
        let updatedData = req.body;

        const cocktail = await Cocktails.findById(cocktailId);
        if (!cocktail) {
            return res.status(404).json({ message: 'Cocktail not found' });
        }

        // If a new image is uploaded and it's different from the existing one, update imageUrl
        if (req.body.imageUrl && cocktail.imageUrl !== req.body.imageUrl) {
            updatedData.imageUrl = req.body.imageUrl;
        }

        const updatedCocktail = await Cocktails.findByIdAndUpdate(cocktailId, updatedData, { new: true });
        res.status(200).json(updatedCocktail);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cocktail: ' + error.message });
    }
};

// Delete cocktail
export const deleteCocktailController = async (req, res) => {
    // Check admin role
    if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can delete cocktails.' });
    }

    try {
        const cocktailId = req.params.id;
        const cocktail = await Cocktails.findById(cocktailId);

        if (!cocktail) {
            return res.status(404).json({ message: 'Cocktail not found' });
        }

        // Optional: Delete the image from Cloudinary
        // Extract public ID from imageUrl and use cloudinary.v2.uploader.destroy(publicId)
        // Example: cloudinary.v2.uploader.destroy('image_public_id')

        // If the cocktail has an image, delete it from Cloudinary
        if (cocktail.imageUrl) {
            const publicId = extractPublicIdFromUrl(cocktail.imageUrl);
            await cloudinary.v2.uploader.destroy(publicId);
        }

        await Cocktails.findByIdAndDelete(cocktailId);
        res.status(200).json({ message: 'Cocktail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cocktail: ' + error.message });
    }
};

// Helper function to extract the public ID from the Cloudinary image URL
function extractPublicIdFromUrl(url) {
    // The implementation here depends on the Cloudinary URL structure.
    // Need to parse the URL to extract the part that represents the public ID?
    // Might need adjustment depending on URL structure.
    const urlParts = url.split('/');
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0]; // Remove file extension
    return publicId;
}



import Cocktails from '../models/Cocktails';
import multer from 'multer';
import path from 'path';

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure the 'uploads/' directory exists
    },
    filename: function (req, file, cb) {
        // Append the timestamp to the original filename to avoid name conflicts
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 },
  ]);
  
// Middleware to handle image upload
const addImageToCocktail = (req, res, next) => {
    upload.single('image')(req, res, (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        if (req.file) {
            req.body.imageUrl = req.file.path; // Add image URL to the request body
        }
        next();
    });
};

// Get all or filtered cocktails
export const getCocktailsController = async (req, res) => {
    try {
        const { search, primaryLiquor, category, ingredientsCount, occasion, flavorProfile, prepTime, drinkware, strength, difficulty, color, allLiquors } = req.query;
        let query = Cocktails.find();

        if (primaryLiquor) {
            query = query.where({ primaryLiquor: new RegExp(primaryLiquor, 'i') });
        }
        if (allLiquors) {
            let liquorArray = Array.isArray(allLiquors) ? allLiquors : [allLiquors];
            query = query.where({ allLiquors: { $in: liquorArray } });
        }
        if (category) {
            query = query.where({ category: new RegExp(category, 'i') });
        }
        if (ingredientsCount) {
            query = query.where({ ingredientsCount: ingredientsCount });
        }
        if (occasion) {
            let occasionArray = Array.isArray(occasion) ? occasion : [occasion];
            query = query.where({ occasion: { $in: occasionArray } });
        }
        if (flavorProfile) {
            let flavorProfileArray = Array.isArray(flavorProfile) ? flavorProfile : [flavorProfile];
            query = query.where({ flavorProfile: { $in: flavorProfileArray } });
        }
        if (prepTime) {
            query = query.where({ prepTime: new RegExp(prepTime, 'i') });
        }
        if (drinkware) {
            query = query.where({ drinkware: new RegExp(drinkware, 'i') });
        }
        if (strength) {
            query = query.where({ strength: new RegExp(strength, 'i') });
        }
        if (difficulty) {
            query = query.where({ difficulty: new RegExp(difficulty, 'i') });
        }
        if (color) {
            query = query.where({ color: new RegExp(color, 'i') });
        }

        if (search) {
            const regexSearch = new RegExp('\\b' + search + '\\b', 'i');
            query = query.find({
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
                    {InspiredByCreator: { $in: [regexSearch] } },
                ]
            });
        }
        
        const cocktails = await query.sort({ name: 1 });
        res.json(cocktails);
     } catch (error) {
        res.status(500).send(error.message);
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

  export const addCocktailController = async (req, res) => {
      // Check admin role first
      if (req.admin.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
      }
  
      // Convert any single-entry fields to arrays if necessary
      const arrayFields = ['allLiquors', 'ingredients', 'InspiredByCreator', 'occasion', 'flavorProfile', 'tags'];
      arrayFields.forEach(field => {
          if (req.body[field] && !Array.isArray(req.body[field])) {
              req.body[field] = [req.body[field]];
          }
      });
  
      // If an image was uploaded, multer will add the file information to req.files
      if (req.files && req.files['image']) {
          req.body.imageUrl = req.files['image'][0].path;
      }
  
      try {
          // Add time and date to the recipe
          req.body.date = new Date();
  
          // Create and save the new cocktail
          const newCocktail = new Cocktails(req.body);
          await newCocktail.save();
          res.status(201).json(newCocktail);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  };
  

// Update a cocktail by ID with image upload
export const updateCocktailController = [addImageToCocktail, async (req, res) => {
    // Check admin role:
    if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const updatedCocktail = await Cocktails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCocktail) {
            return res.status(404).json({ message: 'Cocktail not found' });
        }
        res.json(updatedCocktail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}];

// Delete a cocktail by ID
export const deleteCocktailController = async (req, res) => {
    // Check admin role:
    if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const cocktail = await Cocktails.findByIdAndDelete(req.params.id);
        if (!cocktail) {
            return res.status(404).send('Cocktail not found');
        }
        res.send('Cocktail deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//POSTMAN TESTING

////// Get All Cocktails//////
// Endpoint: /cocktails
// HTTP Method: GET
// Description: Retrieves a list of all cocktails.
// Controller Function: getCocktailsController
// Postman Setup: GET - body-none - http://localhost:3001/cocktails



////// Get Cocktail by ID //////
// Endpoint: /cocktails/:id
// HTTP Method: GET
// Description: Retrieves a single cocktail by its ID.
// Controller Function: getCocktailByIdController
// Postman Setup: GET - body-none - http://localhost:3001/cocktails/:id



////// Add New Cocktail //////
// Endpoint: /cocktails
// HTTP Method: POST
// Description: Creates a new cocktail.
// Controller Function: addCocktailController
// Postman Setup: POST - body-raw-json - http://localhost:3000/cocktails
// Example input:
/*{
    "name": "Classic Margarita",
    "primaryLiquor": "Tequila",
    "ingredients": ["2 oz Tequila", "1 oz Lime Juice", "1 oz Triple Sec", "Salt for rim", "Lime wedge for garnish"],
    "instructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Shake the tequila, lime juice, and triple sec with ice and strain into the glass. Garnish with a lime wedge.",
    "category": "Classic",
    "color": "Yellow",
    "ingredientsCount": 5,
    "creator": "Jane Smith",
    "occasion": ["Party", "Celebration"],
    "difficulty": "Medium",
    "flavorProfile": "Citrus and Strong",
    "imageUrl": "path/to/classic-margarita-image.jpg",
    "servings": 1,
    "prepTime": "10 minutes",
    "drinkware": "Margarita Glass",
    "strength": "Strong",
    "tags": ["Classic", "Citrus", "Strong"]
  }*/
  

  
////// Update Cocktail by ID

// Endpoint: /cocktails/:id
// HTTP Method: PUT
// Description: Updates an existing cocktail by its ID.
// Controller Function: updateCocktailController
// Postman Setup: PUT - body-raw-json - http://localhost:3000/cocktails/:id
// Example input:
/*{
    "name": "Fun Margarita",
    "primaryLiquor": "Tequila",
    "ingredients": ["2 oz Tequila", "1 oz Lime Juice", "1 oz Triple Sec", "Salt for rim", "Lime wedge for garnish"],
    "instructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Shake the tequila, lime juice, and triple sec with ice and strain into the glass. Garnish with a lime wedge.",
    "category": "Classic",
    "color": "Yellow",
    "ingredientsCount": 5,
    "creator": "Jane Smith",
    "occasion": ["Party", "Celebration"],
    "difficulty": "Medium",
    "flavorProfile": "Citrus and Strong",
    "imageUrl": "path/to/classic-margarita-image.jpg",
    "servings": 1,
    "prepTime": "10 minutes",
    "drinkware": "Margarita Glass",
    "strength": "Strong",
    "tags": ["Classic", "Citrus", "Strong"]
  }*/
  

////// Get All or Filtered Cocktails //////
// Endpoint: /cocktails
// HTTP Method: GET
// Description: Retrieves all cocktails or filters by category if category query is provided.
// Controller Function: getCocktailsController
// Postman Setup for All: GET - http://localhost:3000/cocktails
// Postman Setup for Category Filter: GET - http://localhost:3000/cocktails?category=Classic

////// Search Cocktails //////
// Endpoint: /cocktails
// HTTP Method: GET
// Description: Searches for cocktails by name or ingredients.
// Controller Function: getCocktailsController
// Postman Setup: GET - http://localhost:3000/cocktails?term=margarita

////// Delete Cocktail by ID //////

// Endpoint: /cocktails/:id
// HTTP Method: DELETE
// Description: Deletes a cocktail by its ID.
// Controller Function: deleteCocktailController
// Postman Setup: DELETE - body-none - http://localhost:3000/cocktails/:id


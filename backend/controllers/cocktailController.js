const Cocktails = require('../models/Cocktails');

// Controller functions, get all cocktails
exports.getCocktailsController = async (req, res) => {
    try {
        const cocktails = await Cocktails.find();
        res.json(cocktails);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a single cocktail by ID
exports.getCocktailByIdController = async (req, res) => {
    try {
        const cocktail = await Cocktails.findById(req.params.id); // Use 'Cocktails' instead of 'Cocktail'
        if (!cocktail) {
            return res.status(404).send('Cocktail not found');
        }
        res.json(cocktail);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new cocktail
exports.addCocktailController = async (req, res) => {
    try {
        const newCocktail = new Cocktails(req.body); // Use 'Cocktails' instead of 'Cocktail'
        await newCocktail.save();
        res.status(201).send(newCocktail);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update a cocktail by ID
exports.updateCocktailController = async (req, res) => {
    try {
        const cocktail = await Cocktails.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use 'Cocktails' instead of 'Cocktail'
        if (!cocktail) {
            return res.status(404).send('Cocktail not found');
        }
        res.json(cocktail);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a cocktail by ID
exports.deleteCocktailController = async (req, res) => {
    try {
        const cocktail = await Cocktails.findByIdAndDelete(req.params.id); // Use 'Cocktails' instead of 'Cocktail'
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
// Postman Setup: GET - body-none - http://localhost:3000/cocktails



////// Get Cocktail by ID //////
// Endpoint: /cocktails/:id
// HTTP Method: GET
// Description: Retrieves a single cocktail by its ID.
// Controller Function: getCocktailByIdController
// Postman Setup: GET - body-none - http://localhost:3000/cocktails/:id



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
  



////// Delete Cocktail by ID //////

// Endpoint: /cocktails/:id
// HTTP Method: DELETE
// Description: Deletes a cocktail by its ID.
// Controller Function: deleteCocktailController
// Postman Setup: DELETE - body-none - http://localhost:3000/cocktails/:id
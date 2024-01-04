const express = require('express');
// const authenticateAdmin = require('../middleware/authenticateAdmin'); // Uncomment and use this when the middleware is ready

const {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController
} = require('../controllers/cocktailController'); // Require your controller functions

const router = express.Router();

router.get('/', /* authenticateAdmin, */ getCocktailsController);
router.get('/:id', /* authenticateAdmin, */ getCocktailByIdController);
router.post('/', /* authenticateAdmin, */ addCocktailController);
router.put('/:id', /* authenticateAdmin, */ updateCocktailController);
router.delete('/:id', /* authenticateAdmin, */ deleteCocktailController);

module.exports = router;

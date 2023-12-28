// Import necessary modules
import express from 'express';
// import { authenticateAdmin } from '../middleware/authenticateAdmin'; // Ensure you have this middleware to authenticate admins MIRELA
import {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController,
} from '../controllers/cocktailController'; // Import your controller functions

// Create a router instance
const router = express.Router();

// Define the routes
router.get('/', authenticateAdmin, getCocktailsController);
router.get('/:id', authenticateAdmin, getCocktailByIdController);
router.post('/', authenticateAdmin, addCocktailController);
router.put('/:id', authenticateAdmin, updateCocktailController);
router.delete('/:id', authenticateAdmin, deleteCocktailController);

// Export the router
export default router;

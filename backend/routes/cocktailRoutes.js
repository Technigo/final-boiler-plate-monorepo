import express from 'express';
import { authenticateAdmin } from '../middleware/authenticateAdmin';
import {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController
} from '../controllers/cocktailController';
import { uploadToCloudinary } from '../middleware/cloudinaryUpload';

const router = express.Router();

// POST route for adding new cocktails with image upload
router.post('/', authenticateAdmin, uploadToCloudinary, addCocktailController);

// PUT route for updating cocktails, possibly with new image
router.put('/:id', authenticateAdmin, uploadToCloudinary, updateCocktailController);

// GET routes for retrieving cocktails
router.get('/', getCocktailsController);
router.get('/:id', getCocktailByIdController);

// DELETE route for deleting cocktails, including Cloudinary image deletion
router.delete('/:id', authenticateAdmin, deleteCocktailController);

export default router;

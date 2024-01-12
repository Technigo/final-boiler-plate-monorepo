import express from 'express';
import { authenticateAdmin } from '../middleware/authenticateAdmin';
import { uploadToCloudinary } from '../middleware/cloudinaryUpload';
import {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController
} from '../controllers/cocktailController';

const router = express.Router();

// PUBLIC ROUTES//
// GET routes for retrieving cocktails
router.get('/', getCocktailsController);
router.get('/:id', getCocktailByIdController);

// SECURE ADMIN ROUTES //
// POST route for adding new cocktails with image upload
router.post('/', authenticateAdmin, uploadToCloudinary, addCocktailController);

// PUT route for updating cocktails, possibly with new image
router.put('/:id', authenticateAdmin, uploadToCloudinary, updateCocktailController);

// DELETE route for deleting cocktails, including Cloudinary image deletion
router.delete('/:id', authenticateAdmin, deleteCocktailController);

export default router;

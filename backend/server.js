import express from 'express';
import path from 'path';
import { authenticateAdmin } from '../middleware/authenticateAdmin'; // Import middleware to add for protection
import {
  getCocktailsController,
  getCocktailByIdController,
  addCocktailController,
  updateCocktailController,
  deleteCocktailController
} from '../controllers/cocktailController';

// Set up uploadImage function to store uploaded image directly on the server
const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileName = `${Date.now()}${path.extname(req.file.originalname)}`;
  const uploadPath = `uploads/${fileName}`;

  // Store the uploaded image
  try {
    req.file.mv(uploadPath, err => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // Add image URL to the request body
      req.body.imageUrl = uploadPath;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const router = express.Router();

// Routes that handle image uploads with the updated storage configuration
router.post('/', authenticateAdmin, uploadImage, addCocktailController);
router.put('/:id', authenticateAdmin, uploadImage, updateCocktailController);

// Routes that do not handle image uploads remain the same
router.get('/', getCocktailsController);
router.get('/:id', getCocktailByIdController);
router.delete('/:id', authenticateAdmin, deleteCocktailController);

export default router;

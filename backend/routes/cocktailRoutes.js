import express from 'express';
import multer from 'multer';
import path from 'path';
//import { connectAtlasDB } from "../config/db"; // MIRELA
import {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController
} from '../controllers/cocktailController';


// Connect to MongoDB Atlas for cocktail-related data
//connectAtlasDB(); // MIRELA


// Set up multer for file uploads with updated storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Make sure the directory 'uploads/' exists
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Append the timestamp and the original filename
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Routes that handle image uploads with the updated multer middleware
router.post('/', upload.single('image'), addCocktailController);
router.put('/:id', upload.single('image'), updateCocktailController);

// Routes that do not handle image uploads remain the same
router.get('/', getCocktailsController);
router.get('/:id', getCocktailByIdController);
router.delete('/:id', deleteCocktailController);

export default router;

// import express from "express";
// // Uncomment and use this when the middleware is ready
// // import { authenticateAdmin } from '../middleware/authenticateAdmin';

// import {
//     getCocktailsController,
//     getCocktailByIdController,
//     addCocktailController,
//     updateCocktailController,
//     deleteCocktailController
// } from '../controllers/cocktailController'; // Import your controller functions

// const router = express.Router();

// router.get('/', /* authenticateAdmin, */ getCocktailsController);
// router.get('/:id', /* authenticateAdmin, */ getCocktailByIdController);
// router.post('/', /* authenticateAdmin, */ addCocktailController);
// router.put('/:id', /* authenticateAdmin, */ updateCocktailController);
// router.delete('/:id', /* authenticateAdmin, */ deleteCocktailController);

// export default router;

import express from 'express';
import { authenticateAdmin } from '../middleware/authenticateAdmin';
import {
    getCocktailsController,
    getCocktailByIdController,
    addCocktailController,
    updateCocktailController,
    deleteCocktailController
} from '../controllers/cocktailController';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer for file uploads with updated storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configure multer to handle both single and array fields
const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'allLiquors' },
    { name: 'ingredients' },
    { name: 'InspiredByCreator' },
    { name: 'occasion' },
    { name: 'flavorProfile' },
    { name: 'tags' }
    // array fields
]);

// Routes that handle image uploads with the updated multer middleware
router.post('/', authenticateAdmin, upload, addCocktailController);
router.put('/:id', authenticateAdmin, upload, updateCocktailController);

// Other routes that do not require multer configuration for file upload
router.get('/', getCocktailsController);
router.get('/:id', getCocktailByIdController);
router.delete('/:id', authenticateAdmin, deleteCocktailController);

export default router;


// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { authenticateAdmin } from '../middleware/authenticateAdmin'; // Import middleware to add for protection
// import {
//     getCocktailsController,
//     getCocktailByIdController,
//     addCocktailController,
//     updateCocktailController,
//     deleteCocktailController
// } from '../controllers/cocktailController';


// // Set up multer for file uploads with updated storage configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Make sure the directory 'uploads/' exists
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         // Append the timestamp and the original filename
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({ storage: storage });

// const router = express.Router();

// // Routes that handle image uploads with the updated multer middleware
// router.post('/', authenticateAdmin, upload.single('image'), addCocktailController);
// router.put('/:id', authenticateAdmin, upload.single('image'), updateCocktailController);

// // Routes that do not handle image uploads remain the same
// router.get('/', getCocktailsController);
// router.get('/:id', getCocktailByIdController);
// router.delete('/:id', authenticateAdmin, deleteCocktailController);

// export default router;


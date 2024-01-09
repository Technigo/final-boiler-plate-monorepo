// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Cocktails from '../models/Cocktails'; // Ensure this path is correct

// const router = express.Router();

// // Configure storage for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Ensure the 'uploads/' directory exists in your project
//   },
//   filename: function (req, file, cb) {
//     // Create a unique filename to prevent overwriting of files
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Route to handle image upload and associate it with a cocktail
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const { recipeId } = req.body; // Extract the recipe ID from the request body
//     const imagePath = req.file.path; // The path where the image is saved

//     // Find the cocktail by ID and update it with the image path
//     const cocktail = await Cocktails.findByIdAndUpdate(
//       recipeId,
//       { imageUrl: imagePath },
//       { new: true } // Return the updated cocktail object
//     );

//     if (!cocktail) {
//       return res.status(404).json({ message: 'Cocktail not found' });
//     }

//     // Respond with success message and the path of the uploaded image
//     res.json({ message: 'Image uploaded successfully', imagePath: imagePath });
//   } catch (error) {
//     // Handle any errors during the process
//     res.status(500).send(error.message);
//   }
// });

// export default router;

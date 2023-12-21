// // routes/auth.js
// const express = require('express');
// const bcrypt = require('bcryptjs'); // Library for hashing passwords
// const jwt = require('jsonwebtoken'); // JSON Web Token for user authentication
// const User = require('../models/user.js'); // Importing the User model
// const Favorites = require('../models/favorites');
// const router = express.Router(); // Creating an instance of an Express router

// // import { authenticateToken } from '../server.js';
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).send('Authentication token is missing');
//   }

//   verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return res.status(401).send('Authentication token has expired');
//       }
//       return res.status(403).send('Invalid authentication token');
//     }
//     req.userId = decoded.userId;
//     next();
//   });
// };

// // Endpoint for user registration
// router.post('/register', async (req, res) => {
//   try {
//     // Checking if the required fields are provided in the request body
//     if (!req.body.username || !req.body.email || !req.body.password) {
//       return res.status(400).send('Username, email, and password are required');
//     }

//     // Checking if the username or email already exists in the database
//     const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
//     if (existingUser) {
//       return res.status(400).send('Username or email is already taken');
//     }

//     // Hashing the user's password before saving it to the database
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // Saving the user to the database
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(500).send('Something went wrong');
//   }
// });

// // Endpoint for user sign-in
// router.post('/signin', async (req, res) => {
//   try {
//     // Finding the user in the database based on the provided username
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//       return res.status(401).send('Invalid username or password');
//     }

//     // Comparing the provided password with the hashed password stored in the database
//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       return res.status(401).send('Invalid username or password');
//     }

//     // Creating a JSON Web Token (JWT) for user authentication
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).send('Something went wrong');
//   }
// });

// // Add other authentication-related endpoints as needed

// // routes/playground.js
// //Create an endpoint to add a playground to favorites:
// //In your backend, create a new route to handle adding a playground to a user's favorites. Modify your routes accordingly:


// // Endpoint to add a playground to favorites
// router.post('/add-to-favorites', authenticateToken, async (req, res) => {
//   try {
//     // Check if the playground already exists in the user's favorites
//     const user = await User.findById(req.user._id).populate('Favorites');
//     const existingFavorite = user.favorites.find((fav) => fav.apiId === req.body.apiId);

//     if (existingFavorite) {
//       return res.status(400).send('Playground already in favorites');
//     }

//     // Create a new favorite and add it to the user's favorites
//     const newFavorite = new Favorites({ apiId: req.body.apiId, like: true });
//     await newFavorite.save();
    
//     user.favorites.push(newFavorite);
//     await user.save();

//     res.status(201).json({ message: 'Playground added to favorites successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Something went wrong');
//   }
// });

// // Add other playground-related endpoints as needed


// module.exports = router; // Exporting the router for use in other parts of the application

// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // JSON Web Token for user authentication
const User = require('../models/user.js'); // Importing the User model
const Favorites = require('../models/favorites');
const router = express.Router(); // Creating an instance of an Express router
import { verify } from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Authentication token is missing');
  }

  verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Authentication token has expired');
      }
      return res.status(403).send('Invalid authentication token');
    }
    req.userId = decoded.userId;
    next();
  });
};


// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    // Checking if the required fields are provided in the request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send('Username, email, and password are required');
    }

    // Checking if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      return res.status(400).send('Username or email is already taken');
    }

    // Hashing the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Saving the user to the database
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Endpoint for user sign-in
router.post('/signin', async (req, res) => {
  try {
    // Finding the user in the database based on the provided username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Comparing the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid username or password');
    }

    // Creating a JSON Web Token (JWT) for user authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, favorites: user.favorites });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Add other authentication-related endpoints as needed

// routes/playground.js
//Create an endpoint to add a playground to favorites:
//In your backend, create a new route to handle adding a playground to a user's favorites. Modify your routes accordingly:


// Endpoint to add a playground to favorites
// Endpoint to add a playground to favorites
router.post('/add-to-favorites',authenticateToken, async (req, res) => {
  try {
    // Check if the playground already exists in the user's favorites
    const user = await User.findById(req.userId).populate('favorites');

    // Check if the user was found
    if (!user) {
      return res.status(404).send('User not found');
    }

    const existingFavorite = user.favorites.find((fav) => fav.apiId === req.body.apiId);

    if (existingFavorite) {
      return res.status(400).send('Playground already in favorites');
    }

    // Create a new favorite and add it to the user's favorites
    const newFavorite = new Favorites({ apiId: req.body.apiId, like: true });
    await newFavorite.save();
    
    user.favorites.push(newFavorite);
    await user.save();

    res.status(201).json({ message: 'Playground added to favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});


// Add other playground-related endpoints as needed


module.exports = router; // Exporting the router for use in other parts of the application

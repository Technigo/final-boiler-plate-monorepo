// routes/auth.js
import { Router } from 'express';
import { hash, compare } from 'bcryptjs'; // Library for hashing passwords
import { sign } from 'jsonwebtoken'; // JSON Web Token for user authentication
import User, { findOne } from '../models/user'; // Importing the User model

const router = Router(); // Creating an instance of an Express router


// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    // Checking if the required fields are provided in the request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send('Username, email, and password are required');
    }

    // Checking if the username or email already exists in the database
    const existingUser = await findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      return res.status(400).send('Username or email is already taken');
    }

    // Hashing the user's password before saving it to the database
    const hashedPassword = await hash(req.body.password, 10);
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
    const user = await findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Comparing the provided password with the hashed password stored in the database
    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid username or password');
    }

    // Creating a JSON Web Token (JWT) for user authentication
    const token = sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Add other authentication-related endpoints as needed

export default router; // Exporting the router for use in other parts of the application

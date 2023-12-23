import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from 'express-list-endpoints';

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized - Missing Access Token' });
  }

  const user = await User.findOne({ accessToken });

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ error: 'Forbidden - Invalid Access Token' });
  }
};

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});


app.post('/users', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    console.log('Attempting to save user:', user);
    await user.save();
    console.log('User saved successfully:', user);

    // Include user data in the response
    res.status(201).json({
      message: 'Yay, you are now a member!',
      user: { id: user._id, name: user.name, email: user.email },
      accessToken: user.accessToken,
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Internal Server Error during registration' });
  }
});

app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/secrets', authenticateUser);
app.get('/secrets', (req, res) => {
  const { name } = req.user;

  res.json({ secret: `Hello, ${name}! This is a secret message for logged-in users` });
});



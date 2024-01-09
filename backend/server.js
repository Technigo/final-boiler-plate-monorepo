import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';  // Import the cors middleware
import authRoutes from './routes/auth';
import { verify } from 'jsonwebtoken';
import listEndpoints from 'express-list-endpoints';
const dotenv = require('dotenv').config();

const app = express();
const PORT = 3002;

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-playground";
connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());  // Use cors middleware here

app.use(json());

// Middleware to check the authentication token for protected routes
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

// Use the authentication routes directly
app.use('/api', authRoutes);


// Authenticated endpoint (example)
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected resource', user: req.userId });
});

// Endpoint to list all routes
app.get('/', (req, res) => {
  const endpoints = listEndpoints(app);
  res.status(200).json(endpoints);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


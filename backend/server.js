
import express from 'express';
import cors from 'cors';
import db from './database.js'; // Import the database connection


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', taskRoutes); // Example route prefix
app.use('/users', userRoutes); // Example route prefix

// The server starts listening only after the database connection is established
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

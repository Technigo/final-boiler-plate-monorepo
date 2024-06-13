// // Import necessary libraries and modules
// import express from "express" // Import the Express.js framework
// import cors from "cors" // Import the CORS middleware
// import dotenv from "dotenv" // Import dotenv for environment variables
// dotenv.config() // Load environment variables from the .env file
// import taskRoutes from "./routes/taskRoutes" // Import custom task controlled-routes
// import userRoutes from "./routes/userRoutes" // Import custom user routes
// import { connectDB } from "./config/db" // Import database connection function (not used here)

// // Defines the port the app will run on. Defaults to 8080, but can be overridden
// const port = process.env.PORT // Set the port number for the server
// const app = express() // Create an instance of the Express application

// // Add middlewares to enable cors and json body parsing
// app.use(cors()) // Enable CORS (Cross-Origin Resource Sharing)
// app.use(express.json()) // Parse incoming JSON data
// app.use(express.urlencoded({ extended: false })) // Parse URL-encoded data

// // Use the routes for handling API requests
// // ROUTES - These routes USE controller functions ;)
// app.use(taskRoutes) // Use the task-controlled routes for task-related requests
// app.use(userRoutes) // Use the user-controlled routes for user-related requests

// // Connection to the database through Mongoose
// connectDB()

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

// // Start the server and listen for incoming requests on the specified port
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`) // Display a message when the server is successfully started
// })

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file

// Defining port and connecting to mongoose
const port = process.env.PORT || 4000;
const app = express();
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/pluggIn-users";

mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const levelSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  score: { type: Number, default: 0 },
  levelScore: { type: Number, default: 20 },
});

const subcategorySchema = new mongoose.Schema({
  levels: [levelSchema],
});

const progressSchema = new mongoose.Schema({
  math: {
    addition: subcategorySchema,
    multiplication: subcategorySchema,
    subtraction: subcategorySchema,
    division: subcategorySchema,
  },
  swedish: {
    synonyms: subcategorySchema,
  },
  english: {
    translate: subcategorySchema,
  },
});

// Defining schema for a User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  progress: progressSchema,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

//Authenticate user as middleware
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing access token" });
  }

  const user = await User.findOne({ accessToken });
  if (user) {
    console.info("User is found", user);
    req.user = user;
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Invalid access token" });
  }
};

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable." });
  }
});

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello 👋 This is server running for project PluggIn");
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find().exec();
  if (allUsers.length > 0) {
    res.status(200).json(allUsers);
  } else {
    res.status(404).send("No users found");
  }
});

//Create user with username, password etc.
app.post("/users", async (req, res) => {
  try {
    const { username, firstName, lastName, age, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      username,
      firstName,
      lastName,
      age,
      email,
      password: bcrypt.hashSync(password, salt),
      progress: {
        math: {
          addition: { levels: [{}, {}, {}, {}] },
          multiplication: { levels: [{}, {}, {}, {}] },
          subtraction: { levels: [{}, {}, {}, {}] },
          division: { levels: [{}, {}, {}, {}] },
        },
        swedish: { synonyms: { levels: [{}, {}, {}, {}] } },
        english: { translate: { levels: [{}, {}, {}, {}] } },
      },
    });
    await user.save();
    res.status(201).json({
      id: user._id,
      username: user.username,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res
      .status(400)
      .json({ response: error, message: "Could not create user." });
  }
});

//Endpoint for login
app.post("/sessions", async (req, res) => {
  const { username, email, password } = req.body;
  // use this variable to store userInfo
  let user;

  if (username) {
    user = await User.findOne({ username });
  } else if (email) {
    user = await User.findOne({ email });
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      userId: user._id,
      username: user.username,
      accessToken: user.accessToken,
    });
  } else {
    res.status(404).json({ notFound: true });
  }
});

app.get("/games", authenticateUser);
app.get("/games", async (req, res) => {
  res
    .status(200)
    .json({ message: "Secret message only for logged in users to see!" });
});

// Route for storing progress
app.post("/progress", authenticateUser, async (req, res) => {
  const { subject, subcategory, level, score } = req.body;
  const userId = req.user._id; // Get user id

  console.log("Incoming data:", req.body);

  try {
    // Find user by using id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update progress for the current subject / subcategory
    user.progress[subject][subcategory].levels[level - 1].score += 1;

    // Save updates to db
    await user.save();

    res.status(201).json({ message: "Progress updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Route to get progress from db
app.get("/progress", authenticateUser, async (req, res) => {
  try {
    const user = req.user; // get user

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Get progress from user with current user_id
    const progress = await User.findById(user._id, "progress");

    if (!progress) {
      return res.status(404).json({ message: "Progress not found." });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch progress" });
  }
});

// Start the server
app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});

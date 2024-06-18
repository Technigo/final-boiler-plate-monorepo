import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt-nodejs"
import crypto from "crypto"
import dotenv from "dotenv" // Import dotenv for environment variables
dotenv.config() // Load environment variables from the .env file
import englishData from "../frontend/src/data/EnglishGameData.json"
import swedishData from "../frontend/src/data/SwedishGameData.json"


// Defining port and connecting to mongoose
const port = process.env.PORT || 4000
const app = express()
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/pluggIn-users"

mongoose.connect(mongoUrl)
mongoose.Promise = Promise

const levelSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  score: { type: Number, default: 0 },
  levelScore: { type: Number, default: 20 },
})

const subcategorySchema = new mongoose.Schema({
  levels: [levelSchema],
})

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
})

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
})

const User = mongoose.model("User", userSchema)

module.exports = User

//Authenticate user as middleware
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: Missing access token" })
  }

  const user = await User.findOne({ accessToken })
  if (user) {
    console.info("User is found", user)
    req.user = user
    next()
  } else {
    return res.status(403).json({ error: "Forbidden: Invalid access token" })
  }
}

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: "Service unavailable." })
  }
})

// Defining routes
app.get("/", (req, res) => {
  res.send("Hello 👋 This is server running for project PluggIn")
})

app.get("/users", async (req, res) => {
  const allUsers = await User.find().exec()
  if (allUsers.length > 0) {
    res.status(200).json(allUsers)
  } else {
    res.status(404).send("No users found")
  }
})

const createLevels = (questions) => {
  const uniqueLevels = [...new Set(questions.map((q) => q.level))]
  const levels = uniqueLevels.map((level) => ({
    level: level,
    score: 0,
    levelScore: 20,
  }))
  return levels
}

//Create user with username, password etc.
app.post("/users", async (req, res) => {
  try {
    const { username, firstName, lastName, age, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      username,
      firstName,
      lastName,
      age,
      email,
      password: bcrypt.hashSync(password, salt),
      progress: {
        math: {
          addition: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
          subtraction: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
          multiplication: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
          division: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
        },
        swedish: {
          synonyms: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
        },
        english: {
          translate: {
            levels: [
              { level: 1, score: 0, levelScore: 20 },
              { level: 2, score: 0, levelScore: 20 },
              { level: 3, score: 0, levelScore: 20 },
            ],
          },
        },
      },
    })
    await user.save()
    res.status(201).json({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      accessToken: user.accessToken,
    })
  } catch (error) {
    res.status(400).json({ response: error, message: "Could not create user." })
  }
})

//Endpoint for login
app.post("/sessions", async (req, res) => {
  const { username, email, password } = req.body
  // use this variable to store userInfo
  let user

  if (username) {
    user = await User.findOne({ username })
  } else if (email) {
    user = await User.findOne({ email })
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      accessToken: user.accessToken,
    })
  } else {
    res.status(404).json({ notFound: true })
  }
})

// Route for storing progress
app.post("/progress", authenticateUser, async (req, res) => {
  const { subject, subcategory, level, score } = req.body
  const userId = req.user._id // Get user id

  try {
    // Find user by using id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Update progress for the current subject / subcategory
    user.progress[subject][subcategory].levels[level - 1].score += 1;


    // Save updates to db
    await user.save()

    res.status(201).json({ message: "Progress updated successfully" })
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" })
  }
})

// Route to get progress from db
app.get("/progress", authenticateUser, async (req, res) => {
  try {
    const user = req.user // get user

    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    // Get progress from user with current user_id
    const progress = await User.findById(user._id, "progress")

    if (!progress) {
      return res.status(404).json({ message: "Progress not found." })
    }

    res.status(200).json({ progress })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch progress" })
  }
})

// Start the server
app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`)
})

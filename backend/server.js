import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import crypto from "crypto" 
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
dotenv.config()

const { Schema } = mongoose
const userSchema = new Schema(
  {
    username: {
      type: String, 
      required: true, 
      unique: true, 
    },
    password: {
      type: String, 
      required: true, 
    },
    accessToken: {
      type: String, 
      default: () => crypto.randomBytes(128).toString("hex"), 
    },
    grid: {
      type: Array,
      default: [{ row: 3, column: 'C' }] // initial value for the grid
    },
  },
  {
    timestamps: true,
  }
)
// const UserModel = mongoose.model("User", userSchema) 
const UserModel = mongoose.model('Cat', userSchema, 'cats')

// user controller function
const registerUserController = asyncHandler(async (req,res) => {
  const { username, password } = req.body
  try {
    console.log("Received registration request:", { username, password })
    if (!username || !password) {
      res.status(400)
      throw new Error("Please add all fields")
    }
    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
      res.status(400)
      throw new Error(
        `User with username ${username} already exists`
      )
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      grid: [{ row: 3, column: 'C' }]
    })
    console.log(newUser) // log user before saving
    await newUser.save()
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        id: newUser._id,
        accessToken: newUser.accessToken,
        grid: newUser.grid // when a client registers , user will receive the initial position
      },
    })
  } catch (e) {
    console.error("Registration Error:", e.message)
    res.status(500).json({ success: false, response: e.message })
  }
})

const loginUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  try {
    console.log("Received login request:", { username, password })
    const user = await UserModel.findOne({ username })
    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" })
    }
    res.status(200).json({
      success: true, 
      response: {
        username: user.username,
        id: user._id,
        accessToken: user.accessToken, 
      }
    })
  } catch (e) {
    console.error("Login Error:", e.message)
    res.status(500).json({ success: false, response: e.message })
  }
})

// controller to handle /up endpoint
const upUserController = asyncHandler(async (req, res) => {
  const { user } = req
  try {
    // update the user's grid by decreasing the row by 1
    const upUser = await UserModel.findOneAndUpdate(
      { _id: user._id }, // find the user by id
      { $inc: { 'grid.0.row': -1 } }, // decrease the row
      { new: true, lean: true } // return the updated document // use lean to get a plain javascript document
    )
    
    // if the row becomes less than 1, set it back to 3
    console.log('before upuser grid row:', upUser.grid[0].row)
    if (upUser.grid[0].row < 1 ) {
      upUser.grid[0].row = 3
      // await upUser.save()
      console.log('after upuser grid row:', upUser.grid[0].row)
    }

    // // if the row becomes less than 1, set it back to 3
    // if (user.grid[0].row < 1 ) {
    //   user.grid[0].row = 3
    //   // await upUser.save()
    //   await user.save()
    // }

    // save the updated user to the database
    // await user.save()
    // await upUser.save()
    await UserModel.findByIdAndUpdate(user._id, { $set: { grid: upUser.grid }})
    console.log('saved grid to the database:', upUser.grid[0].row)
    console.log('Updated grid:', upUser.grid)
    // console.log('Updated grid:', user.grid)

    // respond with the updated user information
    res.status(200).json({
      success: true, 
      response: {
        grid: upUser.grid,
        // grid: user.grid,
      }
    })

    // retrieve users with grid value of 3,C
    const userWithGrid3C = await UserModel.find({ 'grid.row': 3, 'grid.column': 'C' })
    console.log('Users with grid value 3,C:', userWithGrid3C)
    // retrieve users with the same grid value of current user
    const userWithSameGrid = await UserModel.find({ 'grid.row': upUser.grid[0].row, 'grid.column': upUser.grid[0].column })
    console.log('Users with the same grid value:', userWithSameGrid)
    // check if any user has the username 22222
    const targetUsername = '22222'
    // const userWithTargetUsername = userWithSameGrid.find(user => user.username === targetUsername)
    const userWithTargetUsername = userWithSameGrid.some(user => user.username === targetUsername)
    if (userWithTargetUsername) {
      console.log('... you cant believe your eyes. you found something from the ground')
    }
  } catch (e) {
    console.error("Error updating grid:", e.message)
    res.status(500).json({ success: false, response: e.message })
  }
})


// middleware for user authentication
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await UserModel.findOne({ accessToken: accessToken })
    if (user) {
      req.user = user 
      next() 
    } else {
      res.status(401).json({ success: false, response: "Please log in" })
    }
  } catch (e) {
    res.status(500).json({ success: false, response: e.message })
  }
}


// Define user routes
const router = express.Router()
router.post("/register", registerUserController) 
router.post("/login", loginUserController) 
router.post("/up", authenticateUser, upUserController)

const port = process.env.PORT; 
const app = express(); 

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use('/', router)  // to mount router on the app

// to connect to the MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`) 
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); 
});

import express from "express";
import { UserController } from "../controllers/UserController";

const { requiresAuth } = require("express-openid-connect");
const router = express.Router();

router.get("/profile", requiresAuth(), UserController.getProfile);
router.get("/", UserController.checkAuthentication);
router.post("/register", UserController.registerUser);
router.get("/users", requiresAuth(), UserController.getAllUsers);
router.get("/user/:user_id", requiresAuth(), UserController.getUserById);
router.get("/messages/", requiresAuth(), UserController.getUserMessages);
router.get("/getallmessages", requiresAuth(),UserController.getAllMessages);

export default router;

// import express from "express";
// import { UserModel } from "../models/UserModel";
// import bcrypt from "bcrypt";

// const router = express.Router();

// const { requiresAuth } = require("express-openid-connect");

// // To display the user's profile, your application should provide a protected route.

// // Add the requiresAuth middleware for routes that require authentication. Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.
// router.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// router.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

// // Registration endpoint
// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (!username || !email || !password) {
//       // if so, set http status to a 400code
//       res.status(400);
//       // and throw new error with some info
//       throw new Error("Please add all fields");
//     }

//     // Check if the current user trying to register is using an username or email that matches with the same username or email in the database, so they would have to choose something different
//     const existingUser = await UserModel.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (existingUser) {
//       res.status(400);
//       throw new Error(
//         `User with ${
//           existingUser.username === username ? "username" : "email"
//         } already exists`
//       );
//     }

//     const user = new UserModel({
//       email,
//       username,
//       password: bcrypt.hashSync(password, 10),
//     });

//     await user.save();
//     res.status(201).json({ id: user._id, accessToken: user.accessToken });
//   } catch (err) {
//     res.status(400).json({
//       message: "Could not create user",
//       errors: err.errors,
//     });
//   }
// });

// router.get("/users", async (req, res) => {
//   try {
//     await UserModel.find()
//       .sort({ createdAt: "desc" })
//       .exec()
//       .then((result) => {
//         res.json(result);
//       });
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.get("/user/:user_id", async (req, res) => {
//   const user_id = req.params.user_id;
//   try {
//     const user = await UserModel.findOne({ user_id });
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// export default router;

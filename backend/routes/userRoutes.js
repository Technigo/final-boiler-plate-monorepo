import express from "express";
import {
  registerUser,
  loginUser,
  allUsers,
} from "../controllers/userController";
import {
  authenticateUser,
  authorizedAdmin,
} from "../middleware/authenticateUser";

// Create an instance of the Express router.
const router = express.Router();

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUser); // When a POST request is made to /register, execute the registerUserController function.

// LOGIN ROUTE: Handle user login
router.post("/login", loginUser); // When a POST request is made to /login, execute the loginUserController function

// ADMIN route to GET list of all users.
router.get("/all-users", authenticateUser, authorizedAdmin, allUsers);

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.

// import express from "express";
// import {
//   registerUserController,
//   loginUserController,
//   usersController,
// } from "../controllers/userController"; // Import controller functions for user registration and login
// // import { authenticateUser } from "../middleware/authenticateUser";

// // Create an instance of the Express router.
// const router = express.Router();

// REGISTER ROUTE: Handle user registration.
// router
//   .route("/register")
//   .post(registerUserController)

//   // ADMIN route to GET list of all users.
//   .get(usersController);

// // LOGIN ROUTE: Handle user login.
// router.post("/login", loginUserController);

// // LOGOUT ROUTE: Handle user logout.
// router.post("/logout");

// router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function

// // LOGIN ROUTE: Handle user login
// router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function

// // LIST USERS ENDPOINT
// router.get("/users", usersController);

// // Export the router for use in the main application
// export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.

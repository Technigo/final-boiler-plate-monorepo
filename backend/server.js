// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file
import { connectDB } from "./config/db"; // Import database connection function (not used here)
import { auth0Config } from "./config/Auth0";
import userRoutes from "./routes/userRoutes";

//Websocket
import ws from "ws";
//------------------

const { auth } = require("express-openid-connect");

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(auth(auth0Config));
app.use(userRoutes);

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)

// Connection to the database through Mongoose
connectDB();

// Start the server and listen for incoming requests on the specified port
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
// });

//#REGION Websocket stuff
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});

const wss = new ws.WebSocketServer({ server });
// wss.on("connection", (connection, req) => {

//   const cookies = req.headers.cookie;
//   console.log(req._events);
//   if (cookies) {
//     const cookieString = cookies
//       .split(";")
//       .find((str) => str.startsWith("_legacy"));
//     // console.log(cookieString);
//     if (cookieString) {
//       const properCookie = cookieString.split(".")[1];
//       if (properCookie) {
//         // console.log(properCookie);
//       }
//     }
//   }
//   // console.log([...wss.clients].map((x) => x.username));
//   // console.log([...wss.clients].length);
// });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "setUserId") {
      // Associate the user ID with the WebSocket connection
      ws.userId = data.userId;
      console.log(`User ${ws.userId} connected.`);
    } else if(data.type === "setReceiverId"){
      ws.receiverId = data.receiverId;
      console.log(`User ${ws.userId} will send chat messages to ${ws.receiverId}.`);
    } else {
      // Handle other message types
    }
  });

  ws.on("close", () => {
    // Clean up user-related data upon WebSocket close
    console.log(`User ${ws.userId} disconnected.`);
  });
});
//#ENDREGION

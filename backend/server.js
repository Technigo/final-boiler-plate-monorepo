
import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
dotenv.config(); 
// import advertRoutes from "./routes/advertRoutes"
// import messageRoutes from "./routes/messageRoutes"
// import userRoutes from "./routes/userRoutes"
import { connectDB } from "./config/db"; 



const port = process.env.PORT; 
const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 


//app.use(taskRoutes); // Use the task-controlled routes for task-related requests
//app.use(userRoutes); // Use the user-controlled routes for user-related requests

connectDB();


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); 
});

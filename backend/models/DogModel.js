import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Soygirt:Durkslag1@atlascluster.enkh5cp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a dog schema
const DogSchema = new mongoose.Schema({
  name: String,
  puppy: Boolean,
  special_adoption: Boolean,
  size: String,
});

const DogModel = mongoose.model("dogs", DogSchema)
module.exports = DogModel

// Create a Dog model
/* const Dog = mongoose.model('Dog', {
  name: String,
  puppy: Boolean,
  special_adoption: Boolean,
  size: String,
}); */

// Define API endpoint for searching dogs
app.get('/dogs', async (req, res) => {
  try {
    const dogs = await Dog.find(req.query);
    res.json(dogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const mongoUrl = process.env.MONGO_URL; // "mongodb://localhost:27017/project-gengo"

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl).then((con) => console.log(`Mongo DB Connected: ${con.connection.host}`));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

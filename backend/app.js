const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

app.use(express.json());

app.use(helmet());

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });

// app.use("/api", limiter);

// app.use(express.json({ limit: "10kb" }));

// app.use(mongoSanitize());

// app.use(xss());

// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   })
// );

app.use(express.static(`${__dirname}/public`));

const flashcardRouter = require("./routes/flashcardRouter");
const categoryRouter = require("./routes/categoryRouter");
const deckRouter = require("./routes/deckRouter");
const userRouter = require("./routes/userRouter");
const stickerRouter = require("./routes/stickerRouter");

app.use("/api/v1/deck", deckRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/flashcard", flashcardRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/sticker", stickerRouter);

app.use("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;

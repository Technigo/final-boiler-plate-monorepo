const Deck = require("../models/deckModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeature");
const { default: mongoose } = require("mongoose");

exports.getAllDecks = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });
  const features = new APIFeatures(
    Deck.find({ user: userStorage }).populate("category").populate("cards"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const deck = await features.query;

  res.status(200).json({
    status: "200",
    results: deck.length,
    data: { deck },
  });
});

exports.getDatesOfDeck = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Deck.find({ category: mongoose.Types.ObjectId(req.params.id) })
      .populate("category")
      .populate("cards")
      .select({
        createdAt: 1,
        last_reviewed_date: 1,
        reviewed_date: 1,
      }),
    req.query
  );

  const deck = await features.query;

  res.status(200).json({
    status: "200",
    results: deck.length,
    data: { deck },
  });
});

exports.getAllDatesOfDeck = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Deck.find().populate("category").populate("cards").select({
      createdAt: 1,
      last_reviewed_date: 1,
      reviewed_date: 1,
    }),
    req.query
  );

  const deck = await features.query;

  res.status(200).json({
    status: "200",
    results: deck.length,
    data: { deck },
  });
});

exports.getDecksByCategory = catchAsync(async (req, res, next) => {
  const searchObj =
    req.params.id === "all" ? {} : { category: mongoose.Types.ObjectId(req.params.id) };
  const features = new APIFeatures(
    Deck.find({ category: mongoose.Types.ObjectId(req.params.id) })
      .populate("category")
      .populate("cards"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const deck = await features.query;
  console.log(deck);
  res.status(200).json({
    status: "200",
    results: deck.length,
    data: { deck },
  });
});

exports.createDeck = catchAsync(async (req, res, next) => {
  c;
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });
  const { title, category } = req.body;
  console.log(req.body, title, category);

  const body =
    category === "all" || category === "" || !category
      ? { title: title, user: userStorage }
      : { title: title, user: userStorage, category: category };

  const newDeck = await Deck.create(body);
  console.log(newDeck, "newDeck");
  res.status(201).json({
    status: "success",
    data: {
      newDeck,
    },
  });
});

exports.getDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id).populate("category").populate("cards");
  res.status(201).json({
    status: "success",
    cards: deck.cards,
    data: {
      deck,
    },
  });
});

exports.deleteDeck = catchAsync(async (req, res, next) => {
  const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    data: null,
  });
});

exports.updateDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!deck) {
    return next(new AppError("No Deck found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      deck,
    },
  });
});

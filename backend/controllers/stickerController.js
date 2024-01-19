const Sticker = require("./../models/stickerModdel");

const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");

const AppError = require("../utils/appError");

exports.getAllStickers = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage) return next(new AppError("No User found with this ID", 404));
  const stickers = await Sticker.find({ user: userStorage });
  if (!stickers || stickers.length === 0)
    return next(new AppError("No Sticker has been created", 401));
  res.status(200).json({
    status: "200",
    results: stickers.length,
    data: { stickers },
  });
});

exports.createSticker = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage) return next(new AppError("No User found with this ID", 404));
  const { color, size, text, title, position } = req.body;
  const newSticker = await Sticker.create({
    color,
    size,
    text,
    title,
    position,
    user: userStorage,
  });

  res.status(201).json({
    status: "success",
    data: {
      newSticker,
    },
  });
});

exports.deleteSticker = catchAsync(async (req, res, next) => {
  const sticker = await Sticker.findByIdAndDelete({ _id: req.params.id });

  if (!sticker) {
    return next(new AppError("No Sticker found with this ID", 404));
  }
  res.json({
    status: "success",
    data: null,
  });
});

exports.updateSticker = catchAsync(async (req, res, next) => {
  const sticker = await Sticker.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!sticker) {
    return next(new AppError("No Sticker found with this ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      sticker,
    },
  });
});

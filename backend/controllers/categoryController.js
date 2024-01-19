const Category = require("../models/categoryModel");

const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");

const AppError = require("../utils/appError");

exports.getCategories = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });

  const categories = await Category.find({ user: userStorage });

  res.status(200).json({
    status: "200",
    results: categories.length,
    data: { categories },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });
  const { category } = req.body;
  const newCategory = await Category.create({ category: category, user: userStorage });
  res.status(201).json({
    status: "success",
    data: {
      newCategory,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id });

  res.json({
    status: "success",
    data: null,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

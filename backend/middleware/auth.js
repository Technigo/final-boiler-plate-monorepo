const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.headers.authorization });
  if (user) {
    req.body.name = user;
    next();
  } else {
    return next(new AppError("Please log in first", 401));
  }
});

const User = require("../models/userModel");
const bcrypt = require("bcrypt-nodejs");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const Users = await User.find();
  res.status(200).json({
    status: "200",
    results: Users.length,
    data: { Users },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  console.log(req.body);

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("All fields need to be filled !!", 400));
  }

  const existingUser = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (existingUser) {
    return next(new AppError("User already exists !!", 400));
  }

  const salt = bcrypt.genSaltSync(10);
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, salt),
    passwordConfirm: bcrypt.hashSync(passwordConfirm, salt),
  });
  await user.save();

  res.status(201).json({ status: true, name: user.name, accessToken: user.accessToken });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user?.password && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({ status: true, name: user.name, accessToken: user.accessToken });
  } else {
    return next(new AppError("No User found", 404));
  }
});

exports.getUser = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const userStorage = await User.findOne({ accessToken: accessToken });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });
  console.log(userStorage);
  res.status(201).json({
    status: "success",
    data: {
      data: userStorage,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const { password, passwordConfirm } = req.body;
  const salt = bcrypt.genSaltSync(10);
  let user;
  if (password || passwordConfirm) {
    user = await User.findOneAndUpdate(
      { accessToken: accessToken },
      {
        password: bcrypt.hashSync(password, salt),
        passwordConfirm: bcrypt.hashSync(passwordConfirm, salt),
      },
      {
        new: true,
      }
    );
  } else {
    user = await User.findOneAndUpdate({ accessToken: accessToken }, req.body, {
      new: true,
    });
  }
  if (!user)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

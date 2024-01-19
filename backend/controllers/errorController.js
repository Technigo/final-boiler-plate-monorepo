const AppError = require("./../utils/appError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode;
  err.status = err.status || "error";
  let error = { ...err };

  error.message = err.message;

  if (error?._message?.includes("validation")) error = handleValidationErrorDB(error);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

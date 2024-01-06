// Desc: A function that takes in a function as an argument and returns a function. The function that is returned calls the function that was passed in as an argument and catches any errors that might occur.
const asyncHandler = (fn) => (req, res, next) => {
  // The asyncHandler function takes in a function as an argument.
  Promise.resolve(fn(req, res, next)).catch(next); // The asyncHandler function returns a function that takes in the request, response, and next arguments. The function calls the function passed in as an argument and catches any errors.
};

// The asyncHandler function is exported.
export default asyncHandler;

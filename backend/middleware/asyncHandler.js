// Using this function helps handle errors more gracefully. It allows to write asynchronous code in your routes without having to write a lot of try/catch blocks.

// Defines the asyncHandler function and takes the "fn"-function as an argument.
const asyncHandler = (fn) => (req, res, next) => {
  // The Promise.resolve() method returns a Promise object that is resolved with a given value. If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. This function is used to wrap the "fn"-function in a promise.
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // If there is an error, it will be passed to the next function in the chain, which is the error handler middleware.
    res.status(500).json({ message: error.message });
  });
};

// The asyncHandler function is exported.
export default asyncHandler;

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// The asyncHandler function is exported.
export default asyncHandler;

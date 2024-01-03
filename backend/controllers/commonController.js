export const handleErrors = (res, error, statusCode = 500, defaultMessage = 'Internal Server Error') => {
    console.error(error);

    // Customize this as needed based on your error handling requirements
    res.status(statusCode).json({
        error: defaultMessage,
    });
};

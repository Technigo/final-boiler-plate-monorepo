import cloudinary from 'cloudinary';

export const uploadToCloudinary = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(); // No file uploaded
    }

    const file = req.files.image; // 'image' refers to the key in the multipart/form-data

    try {
        // Uploading the file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath);

        // Storing the URL and the public ID of the uploaded image in the request body
        req.body.imageUrl = result.secure_url;
        req.body.imagePublicId = result.public_id;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image: ' + error.message });
    }
};

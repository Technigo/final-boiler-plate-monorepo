import cloudinaryFramework from 'cloudinary'; //A module from the Cloudinary NPM package, which is a cloud service that offers solutions for managing static assets like images and videos.
import dotenv from 'dotenv';

dotenv.config();

// Correct the usage here
cloudinaryFramework.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinaryFramework.v2;


//This code is used to set up and configure the Cloudinary service in a Node.js application, making use of environment variables for secure and flexible configuration.
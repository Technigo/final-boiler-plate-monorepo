import multer from "multer"; //A middleware for handling multipart/form-data, primarily used for uploading files.
import { CloudinaryStorage } from "multer-storage-cloudinary"; //A storage engine for multer to upload files to Cloudinary.
import cloudinary from "../config/cloudinaryConfig.js";

//A new instance of CloudinaryStorage is created.
const storage = new CloudinaryStorage({
  cloudinary, //object imported from the configuration file is passed to it, ensuring that uploads use the correct Cloudinary account.
  params: {
    folder: "green-buddy", //Specifies the folder in Cloudinary where the files will be stored, in this case, 'green-buddy'
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
})

const parser = multer({ storage });

export default parser;


//This code configures file upload handling for a Node.js application, allowing files to be uploaded to Cloudinary, stored in a specific folder, limited to certain file formats, and subjected to specified image transformations.
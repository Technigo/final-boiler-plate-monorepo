import mongoose from "mongoose";

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'adSchema'
// Creates a new Mongoose schema named adSchema that defines the structure of a document in the MongoDB collection. It includes fields like brand, createdAt, and done, specifying their data types, validation rules, and default values.
export const adSchema = new Schema(
    {
        image: {
            type: String, // Store URL for the image
            required: true
        },
        imageId: {
            type: String, // Store the unique identifier for the image
            required: true
        },
        title: {
            type: String,
            required: true,
            minlength: 5,
        },
        description: {
            type: String,
            required: true,
        },
        product: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        pickupDate: {
            type: Date,
            default: Date.now
        },
        available: {
            type: Boolean, // Specifies that 'sold' should be a Boolean
            default: true, // Sets a default value of 'true' for 'available'
        },
        // Define the relaitonship between the user and his/her ad --  1:1 relationship with the user or 1 usar can have many ads
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// Create a Mongoose model named 'AdModel' based on the 'adSchema' for the 'ads' collection
// This model is used to interact with the "ads" collection in the MongoDB database. It allows you to perform CRUD operations on documents in that collection and provides methods for data validation based on the schema.
export const AdModel = mongoose.model("Ad", adSchema);

// In summary, this code defines a Mongoose schema (adSchema) that describes the structure of documents for ads in a MongoDB collection. It also creates a Mongoose model (AdModel) associated with the "ads" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting ads.

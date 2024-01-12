import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        validate: {
            validator: (value) => /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Invalid email format",
        },
    },
});

const newsLetter = mongoose.model('newsLetter', newsLetterSchema);

export default newsLetter;

const mongoose = require("mongoose");
const Deck = require("./deckModel");

const flashcardSchema = new mongoose.Schema(
  {
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
      required: [true, "flashcard needs to belong to a deck"],
    },
    question: { type: String, trim: true, required: true },
    answer: { type: String, trim: true, required: true },
    isDone: { type: Boolean, default: false },
    status: {
      type: String,
      default: "very hard",
      enum: {
        values: ["easy", "okay", "hard", "very hard"],
        message: "status is either: easy, okay, hard, very hard",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "flashcard need to know the user"],
    },
  },
  {
    timestamps: true,
  }
);

flashcardSchema.pre("save", async function (next) {
  await Deck.findByIdAndUpdate(this.deck, { $push: { cards: this } });
  next();
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

module.exports = Flashcard;

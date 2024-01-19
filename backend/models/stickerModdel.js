const mongoose = require("mongoose");
const User = require("./userModel");

const stickerSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    position: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
    colors: { background: String, textColor: String },
    size: { width: { type: Number, default: 280 }, height: { type: Number, default: 160 } },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A Sticker needs to belong to a User"],
    },
  },
  {
    timestamps: true,
  }
);

stickerSchema.pre("save", async function (next) {
  await User.findByIdAndUpdate(this.user, { $push: { sticker: this } });
  next();
});

const Sticker = mongoose.model("Sticker", stickerSchema);

module.exports = Sticker;

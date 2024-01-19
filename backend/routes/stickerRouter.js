const express = require("express");

const stickerController = require("../controllers/stickerController");
const authentificateUser = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authentificateUser, stickerController.getAllStickers)
  .post(authentificateUser, stickerController.createSticker);

router
  .route("/:id")
  .delete(authentificateUser, stickerController.deleteSticker)
  .put(authentificateUser, stickerController.updateSticker);

module.exports = router;

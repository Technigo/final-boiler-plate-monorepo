const express = require("express");

const flashcardController = require("../controllers/flashcardController");
const authentificateUser = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authentificateUser, flashcardController.getAllFlashcards)
  .post(authentificateUser, flashcardController.createFlashcard);

router
  .route("/:id")
  .get(authentificateUser, flashcardController.getFlashcard)
  .delete(authentificateUser, flashcardController.deleteFlashcard)
  .put(authentificateUser, flashcardController.updateFlashcard);

module.exports = router;

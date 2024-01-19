const express = require("express");

const deckController = require("../controllers/deckController");
const authentificateUser = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authentificateUser, deckController.getAllDecks)
  .post(authentificateUser, deckController.createDeck);
router.route("/date/category/:id").get(authentificateUser, deckController.getDatesOfDeck);
router.route("/date").get(authentificateUser, deckController.getAllDatesOfDeck);
router.route("/category/:id").get(authentificateUser, deckController.getDecksByCategory);

router
  .route("/:id")
  .get(authentificateUser, deckController.getDeck)
  .delete(authentificateUser, deckController.deleteDeck)
  .put(authentificateUser, deckController.updateDeck);

module.exports = router;

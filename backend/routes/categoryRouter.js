const express = require("express");
const authentificateUser = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(authentificateUser, categoryController.getCategories)
  .post(authentificateUser, categoryController.createCategory);
router
  .route("/:id")
  .get(authentificateUser, categoryController.getCategory)
  .delete(authentificateUser, categoryController.deleteCategory)
  .put(authentificateUser, categoryController.updateCategory);

module.exports = router;

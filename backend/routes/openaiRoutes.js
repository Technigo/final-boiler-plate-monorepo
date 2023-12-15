const express = require("express")
const {generateText} = require("../controllers/openaiController")
const router = express.Router()

router.post("/generateText", generateText)
module.exports = router
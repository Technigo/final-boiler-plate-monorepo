// Endpoint for AI. 
// Imports
const express = require("express")
// Imports the "generateText" function from openaiController module
const { generateText } = require("../controllers/openaiController")

// Create a new router instance using the express.Router() methid
const router = express.Router()

// Define a route for handling POST requests
// When a POST request is received, it will be handled by the "generateText" function
router.post("/generateText", generateText)

// Export
module.exports = router
const express = require("express");
const router = express.Router();

// Import Controllers 
const { contactUsController } = require("../controllers/ContactUs");


// ----------------------------------- [ Contact route ] --------------------------------------------------
router.post("/contact", contactUsController);


// Export router
module.exports = router;
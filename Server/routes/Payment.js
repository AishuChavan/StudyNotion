const express = require("express");
const router = express.Router();

// Import middlerwares
const { auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

// Import Controllers
const { capturePayment,verifyPayment ,sendPaymentSuccessEmail} = require("../controllers/Payments");


// ----------------------------------- [ Payment routes ] --------------------------------------------------
router.post("/capturePayment", auth, isStudent, capturePayment);    // (Only by Student)
router.post("/verifyPayment", auth, isStudent, verifyPayment);                       // (Only by Razorpay)
router.post("/sendPaymentSuccessEmail",auth, isStudent, sendPaymentSuccessEmail);

// Export router
module.exports = router;
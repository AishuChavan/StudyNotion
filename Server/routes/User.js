const express = require("express");
const router = express.Router();

// Import Middlerwares
const { auth } = require("../middlewares/auth");

// Import Controllers 
const { sendOTP, signUp, login, changePassword} = require("../controllers/Auth");
const { resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");


// ----------------------------------- [ Authentication routes ] --------------------------------------------------
router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.put("/changepassword", auth, changePassword);

// ----------------------------------- [ Reset Password routes ] --------------------------------------------------
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);




// Export router
module.exports = router;

const express = require("express");
const router = express.Router();

// Import middlerwares
const { auth, isInstructor } = require("../middlewares/auth");

// Import Controllers 
const { updatedProfile, deleteAccount, getAllUserDetails,getEnrolledCourses,instructorDashboard,updateDisplayPicture} = require("../controllers/Profile");


// ----------------------------------- [ Profile routes] --------------------------------------------------
router.put("/updateProfile", auth, updatedProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// // TODO: getEnrolledCourses , updateDisplayPicture routes pending...


// Export router
module.exports = router;
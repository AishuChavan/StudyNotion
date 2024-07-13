// Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const { connect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Import routes
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const contactRoute = require("./routes/Contact");

// Define port
const PORT = process.env.PORT || 4000;

// Connect with Database
connect();
// Connect with Cloudinary 
cloudinaryConnect();

// Add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
);

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

app.options('*', cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
// Mount the routes
app.use("/api/v1/auth", userRoutes); 
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoute);



// Default Route
app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
})

// Listen server
app.listen(PORT, (req,res) => {
    console.log(`Server started successfully on port ${PORT}`);
})


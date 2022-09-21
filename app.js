const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./config/config.env" });
  }

//Using Middleware
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb", extended: true}))
app.use(cookieParser())

//import routes
 const auth = require("./routes/auth")
 const users = require("./routes/users")
 const hotels = require("./routes/hotels")
 const rooms = require("./routes/rooms")

 //Using Routes
 app.use("/api/auth", auth)
 app.use("/api/users", users)
 app.use("/api/hotels", hotels)
 app.use("/api/rooms", rooms)
 

 app.use((err, req, res, next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
  
 })
 

module.exports = app;
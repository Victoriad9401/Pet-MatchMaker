const express = require("express");
const app = express() //runs express library
const cors = require("cors")
const pool = require('./db');

//middleware
app.use(cors())
app.use(express.json()) //Anytime a fullstack application needs data from client, we need to use request.body obj

// Load ROUTES //
app.use("/api/auth", require("./routes/authRoutes"));

//start server, and listen to port 5000
app.listen(5000, () =>{
    console.log("Server has started on port 5000")
})
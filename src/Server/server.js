const express = require("express");
const app = express() //runs express library
const cors = require("cors")
const pool = require('./db');

//middleware
app.use(cors())

//Anytime a fullstack application needs data from client, we need to use request.body obj
app.use(express.json())

// Test the database connection
pool.connect()
    .then(() => {
        console.log("Connected to the database successfully!");
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });


//start server, and listen to port 5000
app.listen(5000, () =>{
    console.log("Server has started on port 5000")
})
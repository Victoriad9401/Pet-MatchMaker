require('dotenv').config(); //loads env variables from .env

const express = require("express");
const app = express() //runs express library
const cors = require("cors")
const pool = require('./db');

//middleware
const allowedOrigins = [
    "http://localhost:3000",  // Local frontend
    "https://pet-matchmaker.up.railway.app"  // Deployed frontend
];

//Check if request's origin is allowed (defined above).
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(express.json()) //Anytime a fullstack application needs data from client, we need to use request.body obj

// Load ROUTES //
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));

const PORT = process.env.PORT || 5000; // Use Railway's assigned port

//start server, and listen to port 5000
app.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`);
})
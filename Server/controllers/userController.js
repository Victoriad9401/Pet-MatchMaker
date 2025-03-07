const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists in db using email
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in db using their email
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare input password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const payload = { userId: user.rows[0].id };
        const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

module.exports = { registerUser, loginUser };

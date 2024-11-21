const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
});

// Middleware for serving static files
app.use(express.static("public"));

// Test the connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database connected successfully!");
        connection.release();
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1); // Exit the app if the connection fails
    }
})();

// Example API route
app.get("/api/articles", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM articles");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Catch-all route for static files
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

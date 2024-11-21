const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static("public"));

// Example API route
app.get("/api/articles", (req, res) => {
    res.json({ message: "Fetching all articles YOOO" });
});

// Catch-all route for static files
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

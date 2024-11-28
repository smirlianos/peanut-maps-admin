const express = require("express");
const app = express();
const articleRoutes = require("./routes/articleRoutes");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

// Serve static files
app.use(express.static("public"));

// API routes
app.use("/api/articles", articleRoutes);
app.use("/api/emails", emailRoutes);

// Catch-all for serving index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

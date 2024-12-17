const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const articleRoutes = require("./routes/articleRoutes");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Import rate-limiting library

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173", // Local development
            "https://peanutmaps.com", // Production frontend
            "https://www.peanutmaps.com", // With 'www' prefix (optional, for consistency)
            "https://newsite.peanutmaps.com/",
        ],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

// Morgan Setup: Log all HTTP requests to the console
app.use(morgan("combined")); // Use 'combined' for detailed logging

// Morgan Setup: Log to a file
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a", // Append mode
});
app.use(morgan("combined", { stream: logStream })); // Write logs to file

// Rate-limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    headers: true, // Include rate-limit info in response headers
});

// Apply rate-limiting to all API routes
app.use("/api", limiter);

// Middleware to block access to .env files or other sensitive files
app.use((req, res, next) => {
    if (req.url.includes(".env") || req.url.includes("config")) {
        return res.status(403).send("Access Denied");
    }
    next();
});

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

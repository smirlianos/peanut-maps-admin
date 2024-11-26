const Article = require("../models/articleModel");

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.getAllPublishedArticles();
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
};

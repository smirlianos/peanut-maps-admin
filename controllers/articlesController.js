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

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch article" });
    }
};

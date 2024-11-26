const Article = require("../models/articleModel");

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.getAllArticles();
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

exports.saveArticle = async (req, res) => {
    try {
        const {
            id,
            title,
            slug,
            author,
            cover_image,
            content,
            metadata,
            status,
        } = req.body;

        // Validate required fields (example)
        if (!title || !slug || !status) {
            return res
                .status(400)
                .json({ error: "Title, slug, and status are required" });
        }

        const result = await Article.saveArticle({
            id,
            title,
            slug,
            author,
            cover_image,
            content,
            metadata,
            status,
        });

        res.status(200).json({
            message: `Article ${result.action} successfully`,
            articleId: result.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save article" });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Validate inputs
        if (!id || !status) {
            return res
                .status(400)
                .json({ error: "Article ID and status are required" });
        }

        // Validate status value
        const validStatuses = ["draft", "published", "archived"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const affectedRows = await Article.updateArticleStatus(id, status);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.status(200).json({
            message: "Article status updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update article status" });
    }
};

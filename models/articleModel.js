const db = require("../db");

exports.getAllPublishedArticles = async () => {
    const [rows] = await db.query(
        "SELECT * FROM articles WHERE status = 'published'"
    );
    return rows;
};

exports.getArticleById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM articles WHERE id = ? AND status = 'published'",
        [id]
    );
    return rows[0]; // Return the first (and only) result
};

const db = require("../db");

exports.getAllArticles = async () => {
    const [rows] = await db.query(
        "SELECT id, title, cover_image, status FROM articles"
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

exports.saveArticle = async (articleData) => {
    const { id, title, slug, author, cover_image, content, metadata, status } =
        articleData;

    if (!id || id === 0) {
        // Insert new article
        const [result] = await db.query(
            "INSERT INTO articles (title, slug, author, cover_image, content, metadata, status, post_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
            [title, slug, author, cover_image, content, metadata, status]
        );
        return { id: result.insertId, action: "created" };
    } else {
        // Update existing article
        const [result] = await db.query(
            "UPDATE articles SET title = ?, slug = ?, author = ?, cover_image = ?, content = ?, metadata = ?, status = ?, updated_date = NOW() WHERE id = ?",
            [title, slug, author, cover_image, content, metadata, status, id]
        );
        return { id, action: "updated" };
    }
};

exports.updateArticleStatus = async (id, status) => {
    const [result] = await db.query(
        "UPDATE articles SET status = ?, updated_date = NOW() WHERE id = ?",
        [status, id]
    );
    return result.affectedRows; // Returns the number of rows affected
};

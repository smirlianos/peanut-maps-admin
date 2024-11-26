const db = require("../db");

exports.getAllPublishedArticles = async () => {
    const [rows] = await db.query(
        "SELECT * FROM articles WHERE status = 'published'"
    );
    return rows;
};

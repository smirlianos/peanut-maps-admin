const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articlesController");

router.get("/", articlesController.getArticles);

router.get("/:id", articlesController.getArticleById);

router.post("/save", articlesController.saveArticle);

router.patch("/change-status", articlesController.updateStatus);

module.exports = router;

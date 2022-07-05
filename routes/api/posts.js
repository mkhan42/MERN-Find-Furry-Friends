
const express = require("express");
const router = express.Router();
const postCtrl = require("../../controllers/api/posts");

// GET all the post
// GET /api/posts
router.get("/", postCtrl.getPosts);

// GET a single post
router.get("/:id", postCtrl.getOnePost);

// POST /api/posts
router.post("/", postCtrl.createPost);

// DELETE a post
router.delete("/:id", postCtrl.deletePost);

// UPDATE a post
router.put("/:id", postCtrl.updatePost);

module.exports = router;


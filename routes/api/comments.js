const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");

// GET all comments
// GET /api/comments
router.get("/", commentsCtrl.getComments);

// POST /api/comments
router.post("/", commentsCtrl.createComment);

// DELETE a comment
router.delete("/:id", commentsCtrl.deleteComment);

// UPDATE a comment
router.put("/:id", commentsCtrl.updateComment);

module.exports = router;

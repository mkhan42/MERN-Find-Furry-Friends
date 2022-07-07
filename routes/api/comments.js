const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");

// GET all comments by the PostId
// GET /api/comments/:postId
router.get("/:postId", commentsCtrl.getComments);

// CREATE
// POST /api/comments/:postId
router.post("/:postId", commentsCtrl.createComment);

// DELETE a comment
router.delete("/:id", commentsCtrl.deleteComment);

// UPDATE a comment
router.put("/:id", commentsCtrl.updateComment);

module.exports = router;

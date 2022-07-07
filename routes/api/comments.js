const express = require("express");
const router = express.Router();
const commentsCtrl = require("../../controllers/api/comments");

// GET all comments by the PostId
// GET /api/comments/:postId
router.get("/:postId", commentsCtrl.getComments);

// GET all comments by the UserId
// api/comments/user/:userId
router.get("/user/:userId", commentsCtrl.getUserComments);

// CREATE
// POST /api/comments/:postId
//router.post("/:postId", commentsCtrl.createComment);
// POST /api/comments/:postId
router.post("/:postId", commentsCtrl.createComment);

// DELETE a comment
router.delete("/:commentId", commentsCtrl.deleteComment);

// UPDATE a comment - nahhh
// router.put("/:id", commentsCtrl.updateComment);

module.exports = router;

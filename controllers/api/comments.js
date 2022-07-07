const CommentModel = require("../../models/comment");
const mongoose = require("mongoose");

module.exports = {
  getComments,
  createComment,
  deleteComment,
  // updateComment,
};
/*========================================
        get all comments
========================================*/

async function getComments(req, res) {
  const { postId } = req.params;
  // find all the comments in the Post
  const comments = await CommentModel.find({ post: postId }).sort({
    createdAt: -1,
  });
  // .populate("post")
  // .populate("user")
  // .exec();
  console.log(comments);
  res.status(200).json(comments);
}

/*========================================
        create new comment
========================================*/
async function createComment(req, res) {
  const { postId } = req.params;
  //const { commentTitle, content } = req.body;
  // add doc to db
  try {
    const comment = await CommentModel.create({
      ...req.body,
      post: postId,
      user: req.user._id
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/*========================================
        Delete a comment
========================================*/
async function deleteComment(req, res) {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ error: "No such comment" });
  }
  const comment = await CommentModel.findByIdAndDelete({ _id: commentId });
  if (!comment) {
    res.status(404).json("No such comment");
  }
  res.status(200).json(comment);
}

/*========================================
        UPDATE a comment
========================================*/
// async function updateComment(req, res) {
//   //baby step
//   //res.json({ mssg: "UPDATE a comment" });
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such comment" });
//   }

//   const comment = await CommentModel.findByIdAndUpdate({ _id: id }, req.body);
//   if (!comment) {
//     res.status(404).json("no such comment");
//   }
//   res.status(200).json(comment);
// }

const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    postUser: String,
    commentTitle: { type: String, required: true },
    content: String,
  },
  {
    timestamps: true,
  }
);

commentSchema.statics.getComment = function (userId) {
  return this.findOneAndUpdate();
};

module.exports = mongoose.model("Comment", commentSchema);

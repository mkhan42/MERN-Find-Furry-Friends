const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    commentTitle: { type: String, required: true },
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);

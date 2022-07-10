const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    userName: {
      type: String,
    },
    //userId: {type: Number},
    postType: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      // required: true,
      default: "Unknown",
    },
    imgURL: {
      type: String,
      // required: true,
    },
    animalType: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      // required: true,
      default: "Unknown",
    },
    lastAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    reward: {
      type: String,
      default: "No reward",
    },
    contactInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      // require: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

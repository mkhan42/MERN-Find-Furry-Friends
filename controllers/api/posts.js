const PostModel = require("../../models/post");
const mongoose = require("mongoose");

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};

/*========================================
        get all post
========================================*/
async function getPosts(req, res) {
  // baby step
  // res.json({ mssg: "GET all posts" });
  // sort by newest
  const posts = await PostModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
}

/*========================================
        get a single post
========================================*/
async function getPost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findById(id);
  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
}

/*========================================
          create new post
  ========================================*/
async function createPost(req, res) {
  //baby step
  // res.json({ mssg: "POST a new post" });

  // add doc to db
  try {
    const post = await PostModel.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/*========================================
          Delete a post
  ========================================*/
async function deletePost(req, res) {
  //baby step
  // res.json({ mssg: "DELETE a post" });
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findOneAndDelete({ _id: id });
  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
}

/*========================================
          UPDATE a post
  ========================================*/
async function updatePost(req, res) {
  //baby step
  // res.json({ mssg: "UPDATE a post" });
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await PostModel.findOneAndUpdate({ _id: id }, req.body);

  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
}

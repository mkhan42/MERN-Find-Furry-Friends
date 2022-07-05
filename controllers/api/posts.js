const Post = require('../../models/post')
const mongoose = require("mongoose");

module.exports = {
    createPost,
    getPosts,
    getOnePost,
    deletePost,
    updatePost,
}

async function createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(200).json(post);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async function getPosts(req, res) {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  }

async function getOnePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(id);
  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
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

  const post = await Post.findOneAndDelete({ _id: id });
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

  const post = await Post.findOneAndUpdate({ _id: id }, req.body);

  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
}

const Post = require('../../models/post')

module.exports = {
    createPost,
    getPosts
    // getOnePost,
    // deletePost,
    // updatePost,
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
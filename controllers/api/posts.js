const Post = require('../../models/post')

module.exports = {
    create
}

async function create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.json(post);
    } catch (e) {
      res.status(400).json(e);
    }
  }
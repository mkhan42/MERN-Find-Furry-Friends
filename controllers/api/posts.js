const Post = require('../../models/post')
const mongoose = require("mongoose");

module.exports = {
  createPost,
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
  vote
};

async function createPost(req, res) {
  try {
    const post = await Post.create({
      ...req.body,
      user: req.user._id,
      userName: req.user.name,
    });
    res.status(200).json(post);
    //req.userName = req.user.name
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

  const post = await Post.findByIdAndDelete({ _id: id });
  if (!post) {
    res.status(404).json({ error: "No Such Post" });
  }
  res.status(200).json(post);
  //res.redirect('/AllPosts')
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

async function vote(req, res) {
  try {
    let post = await Post.findById( req.params.id );
    post.vote( req.body.val );
    // if ( req.user._id !== post.postedBy ) {
    //     return res.status( 403 ).json( { error: "Unauthorized!" } );
    // }
    post = await Post.findByIdAndUpdate( req.params.id, post ).lean().exec();
    return res.status( 203 ).json( { post } );
  } catch ( err ) {
    return res.status( 500 ).json( { error: err.message } );
  }
}
const Post = require("../models/post.model");

const getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find({});
    posts = posts.filter((post) => post.active);
    for (let post of posts) {
      post.comments = post.comments.filter((comment) => comment.active);
    }
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch posts at the moment. Try again later.",
    });
  }
};

const addNewPost = async (req, res) => {
  try {
    const { user } = req;
    const postData = req.body;
    let newPost = new Post(postData);
    newPost.user = user._id;
    newPost.active = true;
    newPost = await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to add new post." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id } = req.body;
    let post = await Post.findOne({ _id });
    if (!post) {
      res
        .status(500)
        .json({ success: false, message: "Unable to retrive this post." });
    }
    post.active = false;
    for(let comment of post.comments){
      comment.active = false;
    }
    post = await post.save();
    res.json({ success: true, deletedPost: post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to delete post." });
  }
};

const findPostById = async (req, res, next, postId) => {
  let post = await Post.findOne({ _id: postId, active: true });
  if (!post) {
    res
      .status(500)
      .json({ success: false, message: "Unable to retrive this post." });
  }
  req.post = post;
  next();
};

const fetchLikedUsers = async (req, res) => {
  try {
    const { post } = req;
    let users = await post
      .populate({ path: "likes", select: "username" })
      .execPopulate();
    res.json({ success: true, users: users.likes });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to retrive the list of users" });
  }
};

const updateLikedPost = async (req, res) => {
  try {
    let { post, user } = req;
    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter((data) => data != user._id);
    } else {
      post.likes.push(user._id);
    }
    post = await post.save();
    post.comments = post.comments.filter(comment => comment.active);
    res.json({ success: true, post });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to update likes on this post" });
  }
};

const fetchUserComments = async (req, res) => {
  try {
    const { post } = req;
    let users = await post
      .populate({ path: "comments.user", select: "username" })
      .execPopulate();
    users.comments = users.comments.filter((data) => data.active);
    res.json({ success: true, comments: users.comments });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const addUserComment = async (req, res) => {
  try {
    let { post, user } = req;
    let comment = req.body;
    comment.active = true;
    comment.user = user._id;
    post.comments.push(comment);
    post = await post.save();
    post.comments = post.comments.filter(comment => comment.active);
    post = await post
      .populate({ path: "comments.user", select: "username" })
      .execPopulate();
    res.json({ success: true, comments: post.comments });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const deleteUserComment = async (req, res) => {
  try {
    let { post, user } = req;
    const { _id } = req.body;
    if (!post.comments.some((data) => data._id == _id)) {
      res
        .status(500)
        .json({ success: false, message: "Unable to retrive this comment." });
    }
    for (comment of post.comments) {
      if (comment._id == _id) {
        if (comment.user == user._id) {
          comment.active = false;
        } else {
          res
            .status(400)
            .json({
              success: false,
              message: "User do not have permission to delete this comment.",
            });
        }
      }
    }
    post = await post.save();
    const deletedComment = post.comments.find((com) => com._id == _id);
    res.json({ success: true, deletedComment });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to delete comment." });
  }
};

module.exports = {
  getAllPosts,
  addNewPost,
  deletePost,
  findPostById,
  fetchLikedUsers,
  updateLikedPost,
  fetchUserComments,
  addUserComment,
  deleteUserComment,
};

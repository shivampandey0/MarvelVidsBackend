const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

router.route("/")
.get(async(req, res) => {
    try{
        let comments = await Comment.find({}).populate("user");
        console.log(comments);
        res.json(comments);
    }
    catch (err){
        res.status(500).json({message:"Unable to get comments"})
    }
})
.post(async(req, res)=>{
    const commentData = req.body;
    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();
    res.json(savedComment);
})

module.exports = router;
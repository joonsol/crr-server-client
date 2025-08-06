const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.post('/', async (req, res) => {
  try {

    const newPost = new Post(req.body)
    const saved = await newPost.save()
    res.status(201).json(saved)

  } catch (error) {
    res.status(400).json({ error: '작성 실패', message: error.message })
  }
})
router.get('/', async (req, res) => {
  try {

    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(201).json(posts)

  } catch (error) {
    res.status(400).json({ error: '가져오기 실패', message: error.message })
  }
})

module.exports = router;
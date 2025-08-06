const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true // 앞뒤 공백 제거
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: "익명"
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [String], // 예: ['공지', 'FAQ']
      default: []
    }
  },
  {
    timestamps: true // createdAt, updatedAt 자동 생성
  }


)
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
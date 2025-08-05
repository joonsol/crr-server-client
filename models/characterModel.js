// models/character.js

const mongoose = require("mongoose");

// 캐릭터 스키마 정의
const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// "Character" 모델 생성 → 컬렉션명은 "characters"
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;

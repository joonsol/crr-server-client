// routes/board.js

const express = require('express');
const router = express.Router();

// 게시글 데이터 불러오기
let boards = require('../models/boardModel');


router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "전체 게시글 조회", boards });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});


router.get("/:id", (req, res) => {
  try {
    const boardId = Number(req.params.id); // 문자열을 숫자로 변환
    const board = boards.find(item => item.id === boardId); // id 일치하는 게시글 찾기

    if (!board) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시글 조회 성공", board });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});



router.post("/", (req, res) => {
  try {
    const { title, content } = req.body;

    const newBoard = {
      id: Date.now(), // 고유 ID 생성
      title,
      content,
    };

    boards.push(newBoard); // 게시글 추가

    res.status(201).json({ message: "게시글 등록 성공", board: newBoard });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});


router.put("/:id", (req, res) => {
  try {
    const boardId = Number(req.params.id);
    const index = boards.findIndex(item => item.id === boardId); // 인덱스 찾기

    if (index === -1) {
      return res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
    }
    const updateData = req.body

    // 기존 데이터에 새로운 값 덮어쓰기
    boards[index] = { ...boards[index], ...updateData };

    res.status(200).json({ message: "게시글 수정 성공", board: boards[index] });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});



router.delete("/:id", (req, res) => {
  try {
    const boardId = Number(req.params.id);
    const index = boards.findIndex(item => item.id === boardId);

    if (index === -1) {
      return res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
    }

    boards.splice(index, 1); // 해당 인덱스의 게시글 삭제

    res.status(200).json({ message: "게시글 삭제 성공", boards });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});


module.exports = router;
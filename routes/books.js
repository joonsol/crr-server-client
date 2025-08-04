const express = require("express");
const router = express.Router();


// 메모리 데이터
let books = [
    { id: 1, title: "javascript", auther: "김**" },
    { id: 2, title: "html", auther: "김**" },
    { id: 3, title: "css", auther: "김**" },
];
// id로 배열 index 찾기 함수
const findIndexById = (idParam) => books.findIndex(p => p.id === Number(idParam));

// routes/books.post.js (예시 분리 코드 형태)
router.post("/", (req, res) => {
    try {
        const { title, auther } = req.body;

        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ message: "title은 비어있지 않은 문자열이어야 합니다." });
        }
        if (typeof auther !== "string" || auther.trim() === "") {
            return res.status(400).json({ message: "auther는 비어있지 않은 문자열이어야 합니다." });
        }

        const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
        const newBook = {
            id: nextId,
            title: title.trim(),
            auther: auther.trim(),
            createdAt: new Date().toISOString(),
        };

        books.push(newBook);
        return res.status(201).json({ message: "도서 등록 완료", book: newBook, books });
    } catch (error) {
        console.error("도서 등록 오류", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});


// routes/books.getAll.js
router.get("/", (req, res) => {
    try {
        return res.status(200).json({ message: "전체 도서 가져오기", books });
    } catch (error) {
        console.error("전체 도서 조회 오류", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

// routes/books.getOne.js
router.get("/:id", (req, res) => {
    try {
        const bookId = Number(req.params.id);
        const index = findIndexById(bookId)

        if (index === -1) {
            return res.status(404).json({ message: "유효하지 않은 id 값입니다." });
        }

        return res.status(200).json({ message: "도서 하나 가져오기", book: books[index] });
    } catch (error) {
        console.error("도서 조회 오류", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

// routes/books.put.js
router.put("/:id", (req, res) => {
    try {
        const bookId = Number(req.params.id);
        const index = findIndexById(bookId)

        if (index === -1) {
            return res.status(404).json({ message: "수정할 도서가 없습니다." });
        }

        const updateData = req.body;
        books[index] = { ...books[index], ...updateData };

        return res.status(200).json({ message: "도서 수정 완료", book: books[index] });
    } catch (error) {
        console.error("도서 수정 오류", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});


// routes/books.delete.js
router.delete("/:id", (req, res) => {
    try {
        const bookId = Number(req.params.id);
        const index = findIndexById(bookId)

        if (index === -1) {
            return res.status(404).json({ message: "삭제할 도서가 없습니다." });
        }

        const removed = books.splice(index, 1)[0];
        return res.status(200).json({ message: "도서 삭제 완료", removed, books });
    } catch (error) {
        console.error("도서 삭제 오류", error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
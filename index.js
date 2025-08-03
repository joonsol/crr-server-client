const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json())
let books = [
    {
        id: 1,
        title: "javascript",
        auther: "김**",
        createdAt:"2024-01-02"
    },
    {
        id: 2,
        title: "html",
        auther: "김**",
        createdAt:"2024-01-05"
    },
    {
        id: 3,
        title: "css",
        auther: "김**",
        createdAt:"2024-04-05"
    },
]

app.get("/", (req, res) => {
    res.send("Hello, world");
});



app.post('/books', (req, res) => {
    try {
 
        const {  title, auther } = req.body
    // 유효성 검사
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "title은 비어있지 않은 문자열이어야 합니다." });
    }
    if (typeof auther !== "string" || auther.trim() === "") {
      return res.status(400).json({ message: "auther는 비어있지 않은 문자열이어야 합니다." });
    }
    const nextId = books.length? Math.max(...books.map(b=>b.id))+1 : 1

     const newBook={
            id:nextId,
            title:title.trim(),
            auther:auther.trim(),
            createdAt:new Date().toISOString()
        }


        books.push(newBook)
        res.status(200).json({ message: "전체 게시물 등록", books })
    } catch (error) {
        console.error("전체 도서 등록 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
app.get('/books', (req, res) => {
    try {
        res.status(200).json({ message: "전체 도서 가져오기", books })
    } catch (error) {
        console.error("전체 도서 가져오기 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
app.get('/books/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = books.findIndex(u => u.id === bookId)
        if(index===-1){
            res.status(404).json({ message: "유효하지 않은 id 값입니다." })

        }
        res.status(200).json({ message: " 도서 하나 가져오기", books: books[index] })
    } catch (error) {
        console.error("전체 도서 가져오기 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
app.put('/books/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = books.findIndex(u => u.id === bookId)

        // 사용자가 존재하지 않을 경우 404 상태 코드와 메시지 반환
        if (index === -1) {
            return res.status(404).json({ message: "수정할 도서가 없습니다." });
        }
        const updateData = req.body;
        books[index] = { ...books[index], ...updateData }

        res.status(200).json({ message: " 도서 수정하기", books: books[index] })

    } catch (error) {

        console.error("도서 수정하기 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
// patch 는 생략
app.delete('/books/:id', (req, res) => {
    try {
        const bookId = Number(req.params.id)

        const index = books.findIndex(u => u.id === bookId)

        // 사용자가 존재하지 않을 경우 404 상태 코드와 메시지 반환
        if (index === -1) {
            return res.status(404).json({ message: "삭제할 도서가 없습니다." });
        }
        books.splice(index, 1)
        res.status(200).json({ message: " 도서 삭제하기", books })

    } catch (error) {

        console.error("도서 삭제하기 오류", error)
        res.status(500).json({ message: "서버 오류" })

    }
})


app.listen(PORT, () => {
    console.log("Server is running");
});

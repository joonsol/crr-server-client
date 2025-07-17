const express = require('express'); // express 모듈을 가져와서 변수에 담는다
const app = express();              // express 앱 객체 생성
const PORT = 3000

app.use(express.json())



let boards = []
let initId = 1

app.post("/boards", (req, res) => {
    try {
        const newBoard = {
            id: initId++,
            displayId:boards.length+1,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }
        boards.push(newBoard)
        res.status(201).json({
            message: "게시글 생성 완료",
            board: newBoard
        })
    } catch (error) {
        res.status(500).json({ message: "서버 오류" })
    }
})

app.get("/boards", (req, res) => {
    try {
        res.status(200).json({ message: "요청 성공", boards })

    } catch (error) {
        res.status(500).json({ message: "서버 오류" })

    }
})
app.get("/boards/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)
        const index = boards.findIndex(u => u.id === userId)

        if (index == -1) {
            return res.status(404).json({ message: "게시글을 찾을수 없습니다." })
        }
        res.status(200).json({ message: "게시글 가져오기요청 성공", boards: boards[index] })

    } catch (error) {
        res.status(500).json({ message: "서버 오류" })

    }
})
app.put("/boards/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)

        const index = boards.findIndex(u => u.id === userId)

        if (index == -1) {
            return res.status(404).json({ message: "게시글을 찾을수 없습니다." })
        }
        const updatedData = req.body;
        boards[index] = { ...boards[index], ...updatedData }

        res.status(200).json({ message: "정보 수정 성공", boards: boards[index] })

    } catch (error) {
        res.status(500).json({ message: "서버 오류" })

    }
})
app.delete("/boards/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)

        const index = boards.findIndex(u => u.id === userId)

        if (index == -1) {
            return res.status(404).json({ message: "삭제할 게시글을 찾을수 없습니다." })
        }
        boards.splice(index,1)
        boards.map((item, i)=>({
            ...item,
            displayId:idx+1
        }))

        res.status(200).json({ message: "삭제완료", boards })

    } catch (error) {
        res.status(500).json({ message: "서버 오류" })

    }
})



app.get("/", (req, res) => { // 루트 경로에 GET 요청 시
    res.send("Hello Express!") // 응답으로 문자열 반환
})

app.listen(PORT, () => {// 3000번 포트에서 서버 시작
    console.log("Server is running!")
})
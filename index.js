const express = require('express'); // express 모듈을 가져와서 변수에 담는다
const app = express();              // express 앱 객체 생성
const PORT = 3000

app.use(express.json())


let users = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김철수" },
    { id: 3, name: "홍경복" }
]


app.post("/users", (req, res) => {
    try {
        const newUser = req.body;

        users.push({ id: Date.now(), ...newUser })
        res.status(201).json({ message: "사용자목록 업로드", users })
    } catch (error) {
        console.error("사용자 목록 추가중 오류", error)
        res.status(500).json({ message: "서버 내부 오류발생" })
    }
})

app.get("/users", (req, res) => {
    try {
        res.json(users)

        res.status(201).json({ message: "성공적 가져오기" })
    } catch (error) {
        console.error("사용자 목록 조회중 오류", error)
        res.status(500).json({ message: "서버 내부 오류발생" })
    }
})

app.put("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)
        const index = users.findIndex(u=>u.id===userId)

        if(index===-1){
            return res.status(404).json({message:"수정할 사용자가 없습니다."})
        }
        const updatedData =req.body

        users[index]={...users[index],...updatedData}
        res.json({message:"사용자 수정 완료",user:users[index]})

    } catch (error) {
        console.error("사용자 목록 조회중 오류", error)
        res.status(500).json({ message: "서버 내부 오류발생" })
    }
})
app.delete("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id)
        const index = users.findIndex(u=>u.id===userId)

        if(index===-1){
            return res.status(404).json({message:"수정할 사용자가 없습니다."})
        }

        users.splice(index,1)
        res.json({message:"사용자 삭제 완료",users})

    } catch (error) {
        console.error("사용자 목록 조회중 오류", error)
        res.status(500).json({ message: "서버 내부 오류발생" })
    }
})



app.get("/", (req, res) => { // 루트 경로에 GET 요청 시
    res.send("Hello Express!") // 응답으로 문자열 반환
})

app.listen(PORT, () => {// 3000번 포트에서 서버 시작
    console.log("Server is running!")
})
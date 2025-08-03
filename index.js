const express = require('express'); // express 모듈을 가져와서 변수에 담는다
const app = express();              // express 앱 객체 생성
const PORT = 3000

app.use(express.json())


let boards=[]
let initId=1


app.post("/boards",(req,res)=>{
    try {
        const newBoard={
            id:initId++,
            displayId:boards.length+1,
            title:req.body.title,
            content:req.body.content,
            createdAt:new Date().toISOString()
        }

        boards.push(newBoard)

        res.status(201).json({
            message:"게시글 생성완료",
            boards
        })
    } catch (error) {
        console.error("게시글 생성중 오류")
        res.status(500).json({message:"서버오류"})
    }
})
app.get("/boards",(req,res)=>{
    try {

        res.status(201).json({
            message:"게시글 가져오기 완료",
            boards
        })
    } catch (error) {
        console.error("게시글 가져오는중  오류")
        res.status(500).json({message:"서버오류"})
    }
})
app.get("/boards/:id",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            res.status(404).json({message:"아이디가 없습니다."})
        }
    

        res.status(201).json({
            message:"게시글 1개 가져오기 완료",
           board: boards[index]
        })
    } catch (error) {
        console.error("게시글 1개 가져오는중  오류")
        res.status(500).json({message:"서버오류"})
    }
})
app.put("/boards/:id",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            res.status(404).json({message:"아이디가 없습니다."})
        }
        const updateData= req.body

        boards[index]={
            ...boards[index],
            ...updateData
        }

        res.status(201).json({
            message:"게시글 수정하기 완료",
           board: boards[index]
        })
    } catch (error) {
        console.error("게시글 수정하는 중  오류")
        res.status(500).json({message:"서버오류"})
    }
})

// title만 수정하기
app.patch("/boards/:id/title",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            res.status(404).json({message:"아이디가 없습니다."})
        }
        const {title}= req.body

        if(typeof title !=="string" || title.trim()===""){
            res.status(400).json({message:"타이틀은 비어있지 않은 문자열이어야 합니다."})
        }

        boards[index]={
            ...boards[index],
            title:title.trim()
        }
        res.status(200).json({
            message:"게시글  제목 수정하기 완료",
           board: boards[index]
        })
    } catch (error) {
        console.error("게시글  제목 수정하는 중  오류")
        res.status(500).json({message:"서버오류"})
    }
})
// content만 수정하기
app.patch("/boards/:id/content",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            res.status(404).json({message:"아이디가 없습니다."})
        }
        const {content}= req.body

        if(typeof content !=="string" || content.trim()===""){
            res.status(400).json({message:"타이틀은 비어있지 않은 문자열이어야 합니다."})
        }

        boards[index]={
            ...boards[index],
            content:content.trim()
        }
        res.status(200).json({
            message:"게시글  제목 수정하기 완료",
           board: boards[index]
        })
    } catch (error) {
        console.error("게시글  제목 수정하는 중  오류")
        res.status(500).json({message:"서버오류"})
    }
})
app.delete("/boards/:id",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(u=>u.id===boardId)

        if(index===-1){
            res.status(404).json({message:"아이디가 없습니다."})
        }
        boards.splice(index,1)

        res.status(201).json({
            message:"게시글 삭제하기 완료",
            boards
        })
    } catch (error) {
        console.error("게시글 삭제하는 중  오류")
        res.status(500).json({message:"서버오류"})
    }
})


app.get("/", (req, res) => { // 루트 경로에 GET 요청 시
    res.send("Hello Express!") // 응답으로 문자열 반환
})

app.listen(PORT, () => {// 3000번 포트에서 서버 시작
    console.log("Server is running!")
})
const express = require("express");
const bodyParser=require("body-parser")
const logger=require("./customLogger")


const app = express();

app.use(bodyParser.json())
app.use(express.json())
app.use(logger)


// ⭐ 기본 미들웨어
app.use((req, res, next) => {
  console.log("요청이 들어왔습니다:", req.method, req.url);
  next(); // 다음 미들웨어로 넘어감
});

app.post("/user",(req,res)=>{
    const {name,age}=req.body;
    res.send(`사용자 등록: ${name} (${age})`)
})

app.get("/", (req, res) => {
  res.send("로그가 찍히는 홈페이지");
});

app.listen(3000, () => {
  console.log("서버 실행 중");
});

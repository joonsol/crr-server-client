const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // ① .env 파일 불러오기


const app = express();
const PORT = process.env.PORT || 3000; // ② 환경 변수에서 PORT 사용


// ③ 미들웨어 설정
app.use(cors());             // CORS 문제 해결
app.use(express.json());     // JSON 요청 본문 파싱

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB 연결 성공"))
  .catch((err) => console.log("❌ 연결 실패", err));


// ⑤ 라우터 연결
const characterRoutes = require("./routes/character");
app.use("/char", characterRoutes);


app.get("/", (req, res) => {
  res.send("Hello, world");
});
app.get("/hello", (req, res) => {
  res.send("안녕하세요");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

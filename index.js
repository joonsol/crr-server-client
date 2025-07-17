// index.js
const express = require("express");
const app = express();
const requestTime = require("./requestTime");
const logRouter = require("./routes/log");

app.use(express.json());        // JSON 파싱
app.use(requestTime);           // 요청 시간 기록 미들웨어


app.use("/log", logRouter);     // log 라우터 연결



app.get("/", (req, res) => {
  res.send("🎉 서버 실행 중 (GET /)");
});

app.listen(3000, () => {
  console.log("🚀 서버 실행: http://localhost:3000");
});

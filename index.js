const express = require("express");
const app = express();
const PORT = 3000;

// 요청 본문 JSON 파싱
app.use(express.json());

// 라우터 마운트
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

// 루트 경로
app.get("/", (req, res) => {
  res.send("Hello, RESTful API!");
});

app.listen(PORT, () => {
  console.log(`📚 Book API Server is running at http://localhost:${PORT}`);
});

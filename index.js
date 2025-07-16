const express = require('express'); // express 모듈을 가져와서 변수에 담는다
const app = express();              // express 앱 객체 생성
const PORT = 3000
app.get("/", (req, res) => { // 루트 경로에 GET 요청 시
    res.send("Hello Express!") // 응답으로 문자열 반환
})

app.listen(PORT, () => {// 3000번 포트에서 서버 시작
    console.log("Server is running!")
})
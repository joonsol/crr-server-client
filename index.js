const express = require('express'); // express 모듈을 가져와서 변수에 담는다
const app = express();              // express 앱 객체 생성
const PORT = 3000

app.use(express.json())

let posts = [
    {
        id: 1,
        displayId: 1,
        subject: "subject-1",     // 제목 대신 subject 사용
        desc: "desc-1",           // 내용 대신 desc 사용
        createdAt: "2025-08-01",  // 생성일
        status: "draft",          // 상태: draft / published / archived

    },
    {
        id: 2,
        displayId: 2,
        subject: "subject-2",
        desc: "desc-2",
        createdAt: "2025-08-01",
        status: "published",

    },
    {
        id: 3,
        displayId: 3,
        subject: "subject-3",
        desc: "desc-3",
        createdAt: "2025-08-01",
        status: "archived",

    }
];

let initId = 4; // 다음 생성될 게시글 id 값


// id로 배열 index 찾기 함수
const findIndexById = (idParam) => posts.findIndex(p => p.id === Number(idParam));


app.post('/posts', (req, res) => {
    try {
        const { subject, desc } = req.body
        // subject, desc 유효성 검사
        if (typeof subject !== "string" || subject.trim() === "" ||
            typeof desc !== "string" || desc.trim() === "") {
            return res.status(400).json({ message: "subject, desc는 비어있지 않은 문자열이어야 합니다." });
        }
        const newPost = {
            id: initId++,
            displayId: posts.length + 1,
            subject: subject.trim(),
            desc: desc.trim(),
            createdAt: new Date().toISOString(),
            status: "draft",
            likes: 0
        }
        posts.push(newPost)
        res.status(201).json({ message: "게시글 생성 완료", posts });
    } catch (error) {
        console.error("게시글 생성 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})
app.get('/posts', (req, res) => {
    try {

        res.status(201).json({ message: "게시글 조회 완료", posts });
    } catch (error) {
        console.error("게시글 조회 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})
app.get('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findIndexById(postId)

        if (index === -1) return res.status(404).json({ message: "게시글 없음" })

        res.status(201).json({ message: "게시글  1개 조회 완료", post: posts[index] });
    } catch (error) {
        console.error("게시글 1개 조회 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})
app.put('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findIndexById(postId)

        if (index === -1) return res.status(404).json({ message: "게시글 없음" })

        const updatePost = req.body

        posts[index] = {
            ...posts[index],
            ...updatePost
        }

        res.status(201).json({ message: "게시글 1개 수정  완료", post: posts[index] });
    } catch (error) {
        console.error("게시글 1개 수정중  오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})
app.delete('/posts/:id', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findIndexById(postId)

        if (index === -1) return res.status(404).json({ message: "게시글 없음" })

        posts.splice(index, 1)
        res.status(201).json({ message: "게시글 1개  삭제 완료", posts });
    } catch (error) {
        console.error("게시글 1개  삭제  오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})

app.get("/", (req, res) => { // 루트 경로에 GET 요청 시
    res.send("Hello Express!") // 응답으로 문자열 반환
})


// subject
app.patch('/posts/:id/status', (req, res) => {
    try {
        const postId = Number(req.params.id)

        const index = findIndexById(postId)

        if (index === -1) return res.status(404).json({ message: "게시글 없음" })

        const { status } = req.body
        const ALLOWED = ["draft", "published", "archived"];

        if (!ALLOWED.includes(status)) {
            return res.status(400).json({ message: `status는 ${ALLOWED.join(", ")} 중 하나여야 합니다.` });
        }



        posts[index] = {
            ...posts[index],
            status
        }

        res.status(201).json({ message: "상태변경 완료", post: posts[index] });
    } catch (error) {
        console.error("상태변경  오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
})

app.listen(PORT, () => {// 3000번 포트에서 서버 시작
    console.log("Server is running!")
})
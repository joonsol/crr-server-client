
const express = require("express");
let characters = require("../models/characterModel");
const router = express.Router();

const findIndexId = (param) => {
    return characters.findIndex(c => c.id === param)
}
router.post('/', (req, res) => {
    try {

        const { name, level, isOnline } = req.body


        if (!name || typeof level !== "number") {
            return res.status(400).json({ message: "name과 level은 필수입니다." });
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        }
        characters.push(newChar)

        res.status(200).json({ message: "캐릭터 추가하기 성공", characters })



    } catch (error) {
        console.error("캐릭터 추가하기중 오류")
        res.status(500).json({ message: "서버 오류" })
    }
})
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "전체 캐릭터 가져오기", characters })



    } catch (error) {
        console.error("전체 캐릭터 가져오기중 오류")
        res.status(500).json({ message: "서버 오류" })
    }
})
router.get('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id)

        const index = findIndexId(characterId)
        if (index == -1) return res.status(404).json({ message: "게시글 없음" })


        res.status(200).json({ message: "캐릭터1 가져오기", character: characters[index] })

    } catch (error) {
        console.error("캐릭터1 가져오기중 오류")
        res.status(500).json({ message: "서버 오류" })
    }
})
router.put('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id)

        const index = findIndexId(characterId)
        if (index == -1) return res.status(404).json({ message: "게시글 없음" })

        const { name, level, isOnline } = req.body

        if (!name || typeof level !== "number") {
            return res.status(400).json({ message: "name과 level은 필수입니다." });
        }

        characters[index] = {
            ...characters[index],
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        }


        res.status(200).json({ message: "캐릭터1 수정하기 ", character: characters[index] })

    } catch (error) {
        console.error("캐릭터1 수정하기 중 오류")
        res.status(500).json({ message: "서버 오류" })
    }
})
router.delete('/:id', (req, res) => {
    try {
        const characterId = Number(req.params.id)

        const index = findIndexId(characterId)
        if (index == -1) return res.status(404).json({ message: "게시글 없음" })

        characters.splice(index, 1)


        res.status(200).json({ message: "캐릭터1 삭제하기 ", characters })

    } catch (error) {
        console.error("캐릭터1 삭제하기 중 오류")
        res.status(500).json({ message: "서버 오류" })
    }
})

module.exports = router;
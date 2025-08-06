
const express = require("express");
const Characters = require("../models/characterModel");
const router = express.Router();


router.post('/', async (req, res) => {
    try {

        const { name, level, isOnline } = req.body


        if (!name || typeof level !== "number") {
            return res.status(400).json({ message: "name과 level은 필수입니다." });
        }

        const newChar = new Characters({

            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        })

        const savedChar = await newChar.save();


        res.status(200).json({ message: "캐릭터 추가하기 성공", character: savedChar })



    } catch (error) {
        console.error("캐릭터 추가하기중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
router.get('/', async (req, res) => {
    try {

        const character = await Characters.find()


        res.status(200).json({ message: "캐릭터 전체 조회하기 성공", character })



    } catch (error) {
        console.error("캐릭터 추가하기중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
router.get('/:id', async (req, res) => {
    try {

        const charId = req.params.id
        const character = await Characters.findById(charId)


        if (!character) {
            return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." })
        }

        res.status(200).json({ message: "캐릭터 1개 조회하기 성공", character })



    } catch (error) {
        console.error("캐릭터 1개 조회중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
router.put('/:id', async (req, res) => {
    try {

        const { name, level, isOnline } = req.body


        if (!name || typeof level !== "number") {
            return res.status(400).json({ message: "name과 level은 필수입니다." });
        }


        const updateCharater = await Characters.findByIdAndUpdate(
            req.params.id, {
            name, level, isOnline
        }, { new: true, runValidators: true }
        )

        if (!updateCharater) {
            return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." })
        }


        res.status(200).json({ message: "캐릭터 1개 수정하기 성공", character: updateCharater })



    } catch (error) {
        console.error("캐릭터 1개 수정 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})
router.delete('/:id', async (req, res) => {
    try {

        const deleteChar = await Characters.findByIdAndDelete(
            req.params.id)

        if (!deleteChar) {
            return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." })
        }

        res.status(200).json({ message: "캐릭터 1개 삭제하기 성공", character: deleteChar })


    } catch (error) {
        console.error("캐릭터 1개 삭제 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

module.exports = router;

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

module.exports = router;
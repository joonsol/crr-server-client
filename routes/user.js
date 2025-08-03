const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    res.send("사용자 전체 목록")
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    res.send(`사용자 Id: ${id}`)
})
router.post('/', (req, res) => {
    res.send("사용자 등록완료")
})
router.put('/:id', (req, res) => {
    const id = req.params.id

    res.send(`사용자 Id: ${id} 수정완료`)
})
router.delete('/:id', (req, res) => {
    const id = req.params.id

    res.send(`사용자 Id: ${id} 삭제완료`)
})

module.exports = router
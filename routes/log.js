// routes/log.js
const express = require("express");
const router = express.Router();

// POST /log
router.post("/", (req, res) => {
  const { message } = req.body;
  res.send(`✅ 로그 수신됨: ${message} (요청 시간: ${req.requestTime})`);
});

module.exports = router;

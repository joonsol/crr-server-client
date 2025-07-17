// requestTime.js
function requestTime(req, res, next) {
  req.requestTime = new Date().toISOString();
  console.log("🕒 요청 시간:", req.requestTime);
  next();
}

module.exports = requestTime;

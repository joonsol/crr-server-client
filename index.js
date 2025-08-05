const express = require("express");
const app = express();
const PORT = 3000;
const characterRouter= require("./routes/character")



app.use(express.json())
app.use("/characters",characterRouter)

app.get("/", (req, res) => {
  res.send("Hello, world");
});
app.get("/hello", (req, res) => {
  res.send("안녕하세요");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

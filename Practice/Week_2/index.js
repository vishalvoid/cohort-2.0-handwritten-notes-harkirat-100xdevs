const express = require("express");

const app = express();
app.use(express.json())

const port = 3000;

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});

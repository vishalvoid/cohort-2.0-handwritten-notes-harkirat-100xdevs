const express = require("express");

const app = express();

const port = 3000;

app.post("/", (req, res) => {
  console.log(req.headers);
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});

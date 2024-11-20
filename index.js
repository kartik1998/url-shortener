const express = require("express");
const config = require("./utils/config");

const app = express();

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});

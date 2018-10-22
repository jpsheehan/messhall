// require("./bin/server.js");

const express = require("express");
const app = new express();
app.get("/", (req, res) => {
  res.send("Hi");
});
app.listen(process.env.PORT || 3000);

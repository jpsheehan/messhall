// require("./bin/server.js");

const express = require("express");
const app = new express();
app.get("/", (req, res) => {
  res.send("Hi");
});
app.listen(process.env.port || 3000);

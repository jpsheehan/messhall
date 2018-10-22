const express = require("express");

const app = new express();

app.get("/", (req, res) => {
  res.send("Hello, World 2");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening");
});
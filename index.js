const express = require("express");

const app = new express();

app.get("/", function(req, res) {
  res.send("Hello, World 2");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening");
});
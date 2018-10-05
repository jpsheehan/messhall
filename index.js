const express = require("express");

const app = new express();

app.get("/", function(req, res) {
  res.send("Hello, World");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening");
});
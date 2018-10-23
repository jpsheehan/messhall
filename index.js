const express = require("express");

const app = new express();

const port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("Hello, World 2" + process.version);
});

app.listen(port, function() {
  console.log(`Express: http://localhost:${port}/`);
  // console.log(`GraphQL: http://localhost:${port}/graphql`);
});
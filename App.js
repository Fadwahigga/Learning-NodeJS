console.log("NodeJS");
const { Console } = require("console");
//core module
const http = require("http");
const server = http.createServer((request, response) => {
  if (request.url == "/") {
    response.write("<h1>Hello<h1>");
    response.end();
  }
});
const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// // custom module
// const {log} = require("./logger");
// log();
// // Third pary module <packages>

// const express = require("express");

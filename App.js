console.log("NodeJS");
const { Console } = require("console");
//core module
const http = require("http");
const books = [
  { id: 1, name: "book1" },
  { id: 1, name: "book1" },
];
const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.write("<h1>Hello<h1>");
    response.end();
  }
  if (request.url === "/api/books") {
    response.write(JSON.stringify(books));
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

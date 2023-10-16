const express = require("express");
const bookPath = require("./routes/books");

// inti app
const app = express();

// // Add middlewares
app.use(express.json());

// Routes
app.use("/books", bookPath);


// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//////////////////////////////////////////////////////////////////////////////
// console.log("NodeJS");
// const { Console } = require("console");
// //core module
// const http = require("http");
// const server = http.createServer((request, response) => {
//   if (request.url === "/") {
//     response.write("<h1>Hello<h1>");
//     response.end();
//   }
//   if (request.url === "/api/books") {
//     response.write(JSON.stringify(books));
//     response.end();
//   }
// });
// // custom module
// const {log} = require("./logger");
// log();
// // Third pary module <packages>
/////////////////////////////////////////////////////////////////////////////

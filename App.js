const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
// Conection to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Failed to connect to the database", error));

// inti app
const app = express();

// // Add middlewares
app.use(express.json());

// Routes
app.use("/books", booksPath);
app.use("/authors", authorsPath);

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

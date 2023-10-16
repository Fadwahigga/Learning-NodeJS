// console.log("NodeJS");
// const { Console } = require("console");
// //core module
// const http = require("http");
const express = require("express");
const app = express();
const Joi = require("joi");
// Add middlewares
app.use(express.json());
const books = [
  { id: 1, name: "book1", tittle: "neww", author: "fadwa", price: "203" },
  { id: 2, name: "book2", tittle: "newwww", author: "fadwwwa", price: "200" },
  { id: 3, name: "book3", tittle: "newew", author: "fadwaaa", price: "20" },
];
app.get("/", (req, res) => {
  res.send("Hi from nodemon");
});
// get all books
app.get("/books", (req, res) => {
  res.json(books);
});

//get book by id
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Add new book
app.post("/books", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required(),
    tittle: Joi.string().trim().min(3).max(100).required(),
    author: Joi.string().trim().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = {
    id: books.length + 1,
    name: req.body.name,
    tittle: req.body.tittle,
    author: req.body.author,
    price: req.body.price,
  };
  console.log(book);
  books.push(book);
  res.status(201).json(book); //201 created successfully
});

// Running the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//////////////////////////////////////////////////////////////////////////////
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

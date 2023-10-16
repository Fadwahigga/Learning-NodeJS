// console.log("NodeJS");
// const { Console } = require("console");
// //core module
// const http = require("http");
const express = require("express");
const app = express();

const books = [
  { id: 1, name: "book1", tittle: "neww", author: "fadwa" },
  { id: 2, name: "book2", tittle: "newwww", author: "fadwwwa" },
  { id: 3, name: "book3", tittle: "newew", author: "fadwaaa" },
];
app.get("/",(req,res)=>{
  res.send("Hi from nodemon");
});
// get all books
app.get("/books",(req,res)=>{
  res.json(books);
});

//get book by id
app.get("/books/:id",(req,res)=>{
  const book = books.find(b => b.id === parseInt(req.params.id));
  if(book){
    res.status(200).json(book);
  } else{
    res.status(404).json({message:"Book not found"});
  }
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

const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { errorHandler, notFound } = require("./middlewares/errors");
dotenv.config();
// Check if the environment variable is loaded
if (!process.env.MONGO_URI) {
  console.error(
    "MongoDB URI is missing in your .env file or environment variables."
  );
  process.exit(1);
}
// Conection to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Failed to connect to the database", error));

// inti app
const app = express();

// // Add middlewares
app.use(express.json());
app.use(notFound);
app.use(errorHandler);
// Routes
app.use("/books", booksPath);
app.use("/authors", authorsPath);

// Running the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

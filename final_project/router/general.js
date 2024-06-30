const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const booksArray = Object.values(books);


public_users.post("/register", (req,res) => {
const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    return res.status(400).json({ message: "Username or password is empty" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    users.push({ username, password });
    return res.status(200).json({ message: "User created" });
  }});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const booksArray = Object.values(books);
  const filteredBooks = booksArray.filter((book) => book.isbn === isbn);
  return res.send(JSON.stringify(filteredBooks));
});
  
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const booksArray = Object.values(books);
  const filteredBooks = booksArray.filter((book) => book.author === author);
  return res.send(JSON.stringify(filteredBooks));
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const booksArray = Object.values(books);
  const filteredBooks = booksArray.filter((book) => book.title === title);
  return res.send(JSON.stringify(filteredBooks));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = booksArray.find((book) => book.isbn === isbn);
    return res.send(JSON.stringify(book.reviews));
  });

module.exports.general = public_users;

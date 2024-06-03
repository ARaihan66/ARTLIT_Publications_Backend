const BookModel = require("../Models/BookModel");

// Create a new book with image upload
const addBook = async (req, res) => {
    try {
      const { title, summary, authors, publisher, publishedDate, pages } = req.body;
      const coverImage = req.file ? req.file.path : null;
  
      const book = new BookModel({
        title,
        summary,
        authors,
        publisher,
        publishedDate,
        pages,
        coverImage
      });
  
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


// Update a book with image upload
const updateBook =  async (req, res) => {
    try {
      const { title, summary, authors, publisher, publishedDate, pages } = req.body;
      const coverImage = req.file ? req.file.path : null;
  
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      book.title = title;
      book.summary = summary;
      book.authors = authors;
      book.publisher = publisher;
      book.publishedDate = publishedDate;
      book.pages = pages;
      if (coverImage) {
        book.coverImage = coverImage;
      }
  
      await book.save();
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all books
const getBooks = async (req, res) => {
    try {
      const books = await Book.find().populate('authors publisher');
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Get a single book by ID
const getBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate('authors publisher');
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Delete a book by ID
const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      await book.remove();
      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { addBook, updateBook, getBook, getBooks, deleteBook };


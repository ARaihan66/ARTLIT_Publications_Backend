const BookModel = require("../Models/BookModel");

// Create a new book with image upload
router.post('/books', upload.single('coverImage'), async (req, res) => {
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
  });


  
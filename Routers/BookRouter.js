const router = require("express").Router();
const {addBook, updateBook, getBook, getBooks, deleteBook } = require ("../Controllers/BookController");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + path.extname(file.originalname));
    },
  });
  
  // Multer upload
  const upload = multer({ storage: storage });

  
router.route('/books').post(upload.single('coverImage'), addBook);
router.route('/books/:id').put(upload.single('coverImage'), updateBook);
router.route('/books/:id').put(getBook);
router.route('/books').get(getBooks);
router.route('/books/:id').delete(deleteBook);



module.exports = router;
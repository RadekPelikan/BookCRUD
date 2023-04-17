const Book = require("../models/book");
const { ObjectId } = require("mongoose").Types;

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result) return res.status(404).json({ message: "No books were found" });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get book by id
exports.getBookById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: "No book was found" });
  try {
    const result = await Book.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "No book was found" });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: "No book was found" });
  try {
    const newBook = req.body;
    const result = await Book.findByIdAndUpdate(req.params.id, newBook);

    if (!result) return res.status(404).json({ message: "No book was found" });

    res.status(200).json({ message: "Book was updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete all books
exports.deleteAllBooks = async (req, res) => {
  try {
    const books = await Book.deleteMany();

    if (!books) return res.status(404).json({ message: "No books were found" });

    res.status(200).json({ message: "All books were deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: "No book was found" });
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ message: "No book was found" });

    res.status(200).json({ message: "Book was deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

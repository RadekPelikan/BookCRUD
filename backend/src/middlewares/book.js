const Book = require("../models/book");

exports.bookExists = async (req, res, next) => {
  try {
    Book.exists({ _id: req.params.id }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({message: "Something went wrong"});
      }
      if (!result) return res.status(404).json({message: "No book was found"});
      next()
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Something went wrong"});
  }
}
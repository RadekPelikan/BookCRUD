const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const { bookExists } = require("../middlewares/book");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

router.post("/", bookController.createBook);

router.put("/:id", bookController.updateBook);

router.delete("/", bookController.deleteAllBooks);
router.delete("/:id", bookController.deleteBook);

module.exports = router;

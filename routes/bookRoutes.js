const router = require("express").Router();
const controller = require("../controllers/bookController");

router
.route("/")
.get(controller.getAllBooks)
.post(controller.addBook);

router
.route("/:id")
.delete(controller.deleteBook)
.put(controller.updateBook);

module.exports = router;
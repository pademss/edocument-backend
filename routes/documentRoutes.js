const router = require("express").Router();
const controller = require("../controllers/documentController");

router.route("/").get(controller.getAllDocument).post(controller.addDocument);
router.route("/upload").post(controller.uploadDocument);

// router.route("/:id").delete(controller.deleteBook).put(controller.updateBook);

module.exports = router;

const router = require("express").Router();
const controller = require("../controllers/userController");

router.route("/").get(controller.getAllUser).post(controller.addUser);

// router.route("/:id").delete(controller.deleteBook).put(controller.updateBook);

module.exports = router;

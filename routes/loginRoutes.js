const router = require("express").Router();
const controller = require("../controllers/loginController");

router
  .route("/")
  // .post(controller.addLogin)
  .post(controller.getLogin);

// router.route("/:id").delete(controller.deleteBook).put(controller.updateBook);

module.exports = router;

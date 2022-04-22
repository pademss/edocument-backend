const router = require("express").Router();
const controller = require("../controllers/userController");

router.route("/").get(controller.getAllUser).post(controller.addUser);
router.route("/supervisor").get(controller.getAllSupervisor);
router.route("/:id_user").delete(controller.deleteUser);

module.exports = router;

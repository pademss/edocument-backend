const router = require("express").Router();
const controller = require("../controllers/peminjamanController");

router
  .route("/")
  .get(controller.getAllPeminjaman)
  .post(controller.addPeminjaman);

router.route("/:id").put(controller.updateKonfirmasiPeminjaman);

// router.route("/:id").delete(controller.deleteBook).put(controller.updateBook);

module.exports = router;

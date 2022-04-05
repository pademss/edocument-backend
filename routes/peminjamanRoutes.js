const router = require("express").Router();
const controller = require("../controllers/peminjamanController");

router
  .route("/")
  .get(controller.getAllPeminjaman)
  .post(controller.addPeminjaman);
// .get(controller.getPeminjamanByEmail);

router.route("/:id_peminjaman").put(controller.updateKonfirmasiPeminjaman);

router.route("/:id_peminjam").get(controller.getPeminjamanById);

// router.route("/:id").delete(controller.deleteBook).put(controller.updateBook);

module.exports = router;

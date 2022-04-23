const router = require("express").Router();
const controller = require("../controllers/documentController");

router.route("/").get(controller.getAllDocument).post(controller.addDocument);
router.route("/upload").post(controller.uploadDocument);
router
  .route("/:id_dokumen")
  .get(controller.getDocumentById)
  .delete(controller.deleteDocument)
  .put(controller.updateDocument);

module.exports = router;

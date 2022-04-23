const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    bucket: process.env.AWS_BUCKET_NAME,
    s3: s3,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname + uuid.v4());
    },
    acl: "public-read",
    contentDisposition: "inline",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: {
    fileSize: 2000000,
  },
});

exports.addDocument = async (req, res) => {
  console.log(req.headers.authorization.substring(7));
  var decoded = jwt.verify(
    req.headers.authorization.substring(7),
    "padempindikajonathan"
  );
  console.log(decoded);
  if (decoded.level === "admin") {
    const uploadSingle = upload.single("file");

    uploadSingle(req, res, (err) => {
      if (err) {
        console.log(err.message);
        res.status(400).send(err.message);
        // throw err;
      } else {
        const query = `INSERT INTO dokumen(judul_dokumen, id_pic, file_dokumen, kategori_dokumen, nama_pic) values ('${req.file.originalname}', '${req.body.id_pic}', '${req.file.location}', '${req.body.kategori_dokumen}', '${req.body.nama_pic}')`;
        pool.query(query, function (err, result) {
          if (err) {
            res.send("error");
            throw err;
          }
          console.log("berhasil");
          res.send("berhasil");
        });
      }
    });
  } else {
    res.send("kamu bukan admin");
  }
};

exports.getAllDocument = async (req, res) => {
  var decoded = jwt.verify(
    req.headers.authorization.substring(7),
    "padempindikajonathan"
  );
  console.log(decoded);
  if (
    decoded.level === "admin" ||
    decoded.level === "anggota" ||
    decoded.level === "supervisor"
  ) {
    const query = "select * from dokumen";
    pool.query(query, function (err, result) {
      if (err) {
        res.send("error");
        throw err;
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  } else {
    res.send("kamu belum memiliki akun");
  }
};

exports.getDocumentById = async (req, res) => {
  var decoded = jwt.verify(
    req.headers.authorization.substring(7),
    "padempindikajonathan"
  );
  console.log(decoded);
  if (
    decoded.level === "admin" ||
    decoded.level === "anggota" ||
    decoded.level === "supervisor"
  ) {
    const query = `select * from dokumen where id_dokumen = '${req.params.id_dokumen}'`;
    pool.query(query, function (err, result) {
      if (err) {
        res.send("error");
        throw err;
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  } else {
    res.send("kamu belum memiliki akun");
  }
};

exports.deleteDocument = async (req, res) => {
  var decoded = jwt.verify(
    req.headers.authorization.substring(7),
    "padempindikajonathan"
  );
  if (decoded.level === "admin") {
    const query = `DELETE FROM dokumen WHERE id_dokumen = '${req.params.id_dokumen}'`;
    pool.query(query, function (err, result) {
      if (err) {
        res.send("error");
        throw err;
      }
      console.log("berhasil");
      res.send("berhasil");
    });
  } else {
    res.send("kamu bukan admin");
  }
};

exports.updateDocument = async (req, res) => {
  var decoded = jwt.verify(
    req.headers.authorization.substring(7),
    "padempindikajonathan"
  );
  if (decoded.level === "admin") {
    const uploadSingle = upload.single("file");

    uploadSingle(req, res, (err) => {
      if (err) {
        console.log(err.message);
        res.status(400).send(err.message);
        // throw err;
      } else {
        console.log(req.body, req.file);
        if (req.file === undefined) {
          const query = `UPDATE dokumen set judul_dokumen = '${req.body.judul_dokumen}', id_pic = '${req.body.id_pic}', kategori_dokumen = '${req.body.kategori_dokumen}', nama_pic = '${req.body.nama_pic}' WHERE id_dokumen = ${req.params.id_dokumen}`;
          pool.query(query, function (err, result) {
            if (err) {
              res.send("error");
              throw err;
            }
            console.log("berhasil");
            res.send("berhasil");
          });
        } else {
          const query = `UPDATE dokumen set judul_dokumen = '${req.body.judul_dokumen}', id_pic = '${req.body.id_pic}', kategori_dokumen = '${req.body.kategori_dokumen}', nama_pic = '${req.body.nama_pic}', file_dokumen = '${req.file.location}' WHERE id_dokumen = ${req.params.id_dokumen}`;
          pool.query(query, function (err, result) {
            if (err) {
              res.send("error");
              throw err;
            }
            console.log("berhasil");
            res.send("berhasil");
          });
        }
      }
    });
  } else {
    res.send("kamu bukan admin");
  }
};

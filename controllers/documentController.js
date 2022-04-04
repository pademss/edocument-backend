const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.addDocument = async (req, res) => {
  const query = `INSERT INTO dokumen(judul_dokumen, pic) values ('${req.body.judul_dokumen}', '${req.body.pic}')`;
  console.log(req.body);
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log("berhasil");
    res.send("berhasil");
  });
};

exports.getAllDocument = async (req, res) => {
  const query = "select * from dokumen";
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log(result.rows);
    res.send(result.rows);
  });
};

exports.getDocumentById = async (req, res) => {
  const query = `select * from dokumen where id = '${req.params.id_dokumen}`;
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log(result.rows);
    res.send(result.rows);
  });
};

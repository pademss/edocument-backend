const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.addPeminjaman = async (req, res) => {
  const query = `INSERT INTO peminjaman(id_dokumen, id_peminjam, konfirmasi) values ('${req.body.id_dokumen}', '${req.body.id_peminjam}', 'menunggu')`;
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

exports.getAllUser = async (req, res) => {
  const query =
    "select * from peminjaman inner join dokumen ON dokumen.id_dokumen = peminjaman.id_dokumen";
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log(result.rows);
    res.send(result.rows);
  });
};

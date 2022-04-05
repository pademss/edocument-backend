const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jwt = require("jsonwebtoken");

exports.addPeminjaman = async (req, res) => {
  var decoded = jwt.verify(req.body.token, "padempindikajonathan");
  console.log(decoded);
  if (
    decoded.level === "admin" ||
    decoded.level === "anggota" ||
    decoded.level === "supervisor"
  ) {
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
  } else {
    res.send("kamu belum punya akun");
  }
};

exports.getAllPeminjaman = async (req, res) => {
  var decoded = jwt.verify(req.body.token, "padempindikajonathan");
  console.log(decoded);
  if (decoded.level === "admin") {
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
  } else {
    res.send("kamu bukan admin");
  }
};

exports.getPeminjamanById = async (req, res) => {
  var decoded = jwt.verify(req.body.token, "padempindikajonathan");
  console.log(decoded);
  if (
    decoded.level === "admin" ||
    decoded.level === "anggota" ||
    decoded.level === "supervisor"
  ) {
    const query = `select * from peminjaman where id_peminjam = '${req.params.id_peminjam}'`;
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

exports.updateKonfirmasiPeminjaman = async (req, res) => {
  const query = `UPDATE peminjaman SET konfirmasi = '${req.body.konfirmasi}' WHERE id_peminjaman = ${req.params.id_peminjaman}`;
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log("berhasil");
    res.send("berhasil");
  });
};

const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.addUser = async (req, res) => {
  const query = `INSERT INTO pengguna(nama, username, level, unit_kerja, jenis_kelamin, nomor_ktp) values ('${req.body.nama}', '${req.body.username}', '${req.body.level}', '${req.body.unit_kerja}', '${req.body.jenis_kelamin}', '${req.body.nomor_ktp}')`;
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
  const query = "select * from pengguna";
  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    console.log(result.rows);
    res.send(result.rows);
  });
};
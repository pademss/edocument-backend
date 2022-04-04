const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = 4648;

exports.addUser = async (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      console.log(hash);
      const query = `INSERT INTO pengguna(nama, email, level, unit_kerja, jenis_kelamin, nomor_ktp, password) values ('${req.body.nama}', '${req.body.email}', '${req.body.level}', '${req.body.unit_kerja}', '${req.body.jenis_kelamin}', '${req.body.nomor_ktp}', '${hash}')`;
      console.log(req.body);
      pool.query(query, function (err, result) {
        if (err) {
          res.send("error");
          throw err;
        }
        console.log("berhasil");
        res.send("berhasil");
      });
      // Store hash in your password DB.
    });
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

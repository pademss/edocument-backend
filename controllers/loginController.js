const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addLogin = async (req, res) => {
  const query = `INSERT INTO login(email, password, penerbit, tahun) values ('${req.body.judul}', '${req.body.pengarang}', '${req.body.penerbit}', '${req.body.tahun}')`;
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

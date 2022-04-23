const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");
const saltRounds = 10;
var moment = require("moment");
var jwt = require("jsonwebtoken");

exports.getLogin = async (req, res) => {
  const query = `select * from pengguna where email = '${req.body.email}'`;

  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    const data = result.rows[0];
    if (data !== undefined) {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            JSON.stringify(data),
            "padempindikajonathan"
            // { expiresIn: "3M" }
          );
          console.log("sukses");
          res.status(200).send({ pengguna: data, token: token });
        } else {
          console.log("password salah");
          res.status(403).send("password salah");
        }
      });
    } else {
      res.status(403).send("kamu belum punya akun");
    }
  });
};

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

exports.addLogin = async (req, res) => {
  console.log(moment().add(6, "M").toISOString());
  const query = `INSERT INTO token(email, password, token, expires, type) values ('${
    req.body.email
  }', '${req.body.password}', '${req.body.token}', '${moment()
    .add(6, "m")
    .toISOString()}', '${req.body.type_token}')`;
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

exports.getLogin = async (req, res) => {
  const query = `select * from pengguna where email = '${req.body.email}'`;

  pool.query(query, function (err, result) {
    if (err) {
      res.send("error");
      throw err;
    }
    bcrypt.compare(
      req.body.password,
      result.rows.password,
      function (err, response) {
        if (result) {
          const token = jwt.sign(
            JSON.stringify(result.rows[0]),
            "padempindikajonathan"
          );
          console.log("sukses");
          res.status(200).send({ pengguna: result.rows[0], token: token });
        }
      }
    );
    //     console.log(result.rows);
    //     res.status().send(result.rows);
  });
};

const bodyParser = require("body-parser");
const express = require("express");
const { pool } = require("../config/db");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.getAllBooks = async (req, res) => {
        const query = "select *, concat('B',id) as idBuku from tesDataBuku";
        pool.query(query, function (err, result) {
        if (err) {
                res.send("error");
                throw err;
        }
        console.log(result.rows);
        res.send(result.rows);
        });
};

exports.addBook = async (req, res) => {
        const query = `INSERT INTO tesDataBuku(judul, pengarang, penerbit, tahun) values ('${req.body.judul}', '${req.body.pengarang}', '${req.body.penerbit}', '${req.body.tahun}')`;
        pool.query(query, function (err, result) {
        if (err) {
                res.send("error");
                throw err;
        }
        console.log("berhasil");
        res.send("berhasil");
        });
};

exports.updateBook = async (req, res) => {
        const query = `UPDATE tesDataBuku SET judul = '${req.body.judul}', pengarang = '${req.body.pengarang}', penerbit = '${req.body.penerbit}', tahun = '${req.body.tahun}' WHERE id = ${req.params.id}`;
        pool.query(query, function (err, result) {
        if (err) {
                res.send("error");
                throw err;
        }
        console.log("berhasil");
        res.send("berhasil");
        });
};

exports.deleteBook = async (req, res) => {
        const query = `DELETE FROM tesDataBuku WHERE id = '${req.params.id}'`;
        pool.query(query, function (err, result) {
        if (err) {
                res.send("error");
                throw err;
        }
        console.log("berhasil");
        res.send("berhasil");
        });
};
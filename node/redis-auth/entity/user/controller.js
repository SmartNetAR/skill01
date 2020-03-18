"use strict";

const crypto = require("crypto");
const async = require("async");
const mysqlService = require("../../service/mysql.js");
const queries = require("./queries.js");

exports.login = (req, res) => {
  res.json("login");
};

exports.register = (req, res) => {
  const { fullname, email, password } = req.body;

  async.waterfall([
    cb => {
      mysqlService.getConnection((err, conn) => {
        return cb(err, conn);
      });
    },
    (conn, cb) => {
      mysqlService.startTransaction(conn, err => {
        return cb(err, conn);
      });
    },
    (conn, cb) => {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      const user = {
        fullname,
        email,
        password: hashedPassword
      };

      conn.query(
        queries.insertUser,
        [user],
        (err, result) => {
          if (err) {
            return cb(err, conn);
          }

          return cb(null, conn, result.insertId);
        }
      );
    }
  ],
  (err, conn, userId) => {
    if (err) {
      if (conn) {
        mysqlService.closeConnection(conn);
      }

      return res.status(500).send("Internal Server Error.");
    } else {
      mysqlService.commitTransaction(conn, ( err ) => {
        if (err ) {
          return res.status(500).send("Internal Server Error.");
        }
        const resp = {
          id: userId,
          fullname,
          email
        };

        return res.send(resp);
      })
    }
  }
  );
};

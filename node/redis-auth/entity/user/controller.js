"use strict";

const crypto = require("crypto");
const async = require("async");
const mysqlService = require("../../service/mysql.js");
const queries = require("./queries.js");
const redisService = require("../../service/redis.js");
const config = require("../../config/config.js");
const utils = require("../../helper/utils.js")

exports.login = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  mysqlService.executeQuery(queries.getUserByEmailPassword, [email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).send("Internal Server Error.");
    }

    if (!results.length) {
      return res.status(400).send("User not found.");
    }

    const token = utils.generateString(28);
    const result = results[0];

    redisService.insert( `TOKEN_${token}`, JSON.stringify(result), config.tokenTime, (err) => {
      if (err) {
        return res.status(500).send("Internal Server Error.");
      }

      const resp = {
        user: {
          fullname: result.fullname,
          email: result.email,
          id: result.id
        },
        access_token: token
      };

      res.send(resp);
    });
  });
};

exports.logout = (req, res) => {
  const { token } = req.session;

  redisService.delete(`TOKEN_${token}`, (err) => {
    if (err) {
      return res.status(500).json("Internal Server Error.");
    }

    return res.status(200).end();
  });

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

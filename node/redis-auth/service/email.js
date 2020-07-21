"use strict";

const nodemailer = require("nodemailer");
const config = require("../config.js");

exports.send = ( params, content, cb ) => {
    if ( !params.from || !params.to || !params.subject || !content) {
        return cb( {err: "Missing data."} );
    }

    const mailOptions = {
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: content
    };

    const transporter = nodemailer.createTransport(config.nodemailer);

    transporter.sendMail( mailOptions, ( err, info ) => {
        return cb( err, info );
    });
}

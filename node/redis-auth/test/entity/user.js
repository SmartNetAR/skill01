"use strict";

const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index.js");

chai.use(chaiHttp);


describe("entity.user", function() {
    let requester = chai.request(app).keepOpen();

    describe("login", function() {
        it("error al iniciar sesion con usuario incorrecto", function( done ) {
            requester
                .post("/auth/login")
                .set("Content-type", "application/json")
                .send(({email: "test", password: "test"}))
                .then( res => {
                    expect(res).to.have.status(400);
                })
                .then( () => {
                    done();
                })
                .catch( function( err ) {
                    done();
                    throw err;
                })
        });

        it("iniciar sesion con usuario correcto", function( done ) {
            requester
                .post("/auth/login")
                .set("Content-type", "application/json")
                .send(({email: "leo@mail.com", password: "1234"}))
                .end( function ( err, res ) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    requester.close();
                    done();
                })
        });
    });
});
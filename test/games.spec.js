/* global describe, it, beforeEach */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var request;

chai.should();
chai.use(chaiHttp);

describe('Movies', function () {
  beforeEach(function () {
    request = chai.request(server);
  });

  describe('GET', function () {
    it('should return error for invalid URL GET', function (done) {
      request
        .get('/invalid_url')
        .end(function (err) {
          expect(err).not.to.be.null;
          done();
        });
    });
    it('should list all games for GET /movies', function (done) {
      request
        .get('/movies')
        .end(function (err, res) {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.should.be.array;
          done();
        });
    });
  });
});

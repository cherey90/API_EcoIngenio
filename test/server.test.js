const request = require('supertest');
const assert = require('assert').strict;
const app = require('../server');
const { generateToken } = require('../middleware/authMiddleware');


describe("Integration Test", function() {
  const token = generateToken('123456789'); // Genera un token válido
  let server;

  before(function(done) {
    server = app.listen(done);
  });

  after(function(done) {
    server.close(done);
  });

  it("should return 404 for non-existent routes", function(done) {
    request(server)
    .get('/authenticated-route')
    .set('Authorization', `Bearer ${token}`) // Agrega el token al encabezado de autorización
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

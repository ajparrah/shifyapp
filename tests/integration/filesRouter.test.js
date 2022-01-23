import chai from 'chai';
const expect = chai.expect;
import chaiHttp from 'chai-http';
import app from '../../src/server/index.js';

chai.use(chaiHttp);

describe('Secret Files Routes', () => {
  describe('GET /files/data', () => {
    const ROUTE = '/files/data';
    it('Should get a response with status code 200', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error);
          expect(response).have.status(200);
          expect(response.body).be.an('object');
          done();
        });
    });

    it('Should get a response with valid ok property', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error);
          expect(response.body).have.property('ok', true);
          done();
        });
    });

    it('Should get a response with valid files property', () => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error);
          expect(response.body).have.property('files');
          expect(response.body).property('files').be.an('array');
          done();
        });
    });
  });
});

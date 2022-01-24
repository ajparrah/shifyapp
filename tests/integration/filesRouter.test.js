import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/server/index.js'
const expect = chai.expect

chai.use(chaiHttp)

describe('Secret Files Routes', () => {
  describe('GET /files/data', () => {
    const ROUTE = '/files/data'
    it('Should get a response with status code 200', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error)
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('object')
          done()
        })
    })

    it('Should get a response with valid ok property', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error)
          expect(response.body).to.have.property('ok')
          expect(response.body.ok).to.equal(true)
          done()
        })
    })

    it('Should get a response with valid files property', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error)
          expect(response.body).to.have.property('files')
          expect(response.body.files).to.be.an('array').that.is.not.empty
          done()
        })
    })

    it('Should get 4 files in the array only', (done) => {
      chai
        .request(app)
        .get(ROUTE)
        .end((error, response) => {
          if (error) return done(error)
          expect(response.body.files).to.have.length(4)
          done()
        })
    })

    // TODO: Should validate files content
  })
})

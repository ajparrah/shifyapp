import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/server/index.js'
const expect = chai.expect

chai.use(chaiHttp)

describe('Secret Files Routes', () => {
  let requester
  before(function (done) {
    requester = chai.request(app).keepOpen()
    done()
  })

  after(function (done) {
    requester.close()
    done()
  })
  describe('GET /files/data', () => {
    const ROUTE = '/files/data'
    it('Should get a response with status code 200', (done) => {
      requester.get(ROUTE).end((error, response) => {
        if (error) return done(error)
        expect(response).to.have.status(200)
        expect(response.body).to.be.an('object')
        done()
      })
    })

    it('Should get a response with valid ok property - ok has to be true', (done) => {
      requester.get(ROUTE).end((error, response) => {
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
      requester.get(ROUTE).end((error, response) => {
        if (error) return done(error)
        expect(response.body.files).to.have.length(4)
        done()
      })
    })

    it('Should returns valid lines of file', (done) => {
      // Just validate keys because api service can change its data - its files is generated with random values
      requester.get(ROUTE).end((error, response) => {
        if (error) return done(error)
        const lines = response.body.files.map((file) => file.lines).flat()
        expect(lines.every((line) => line.text)).to.equal(true)
        expect(lines.every((line) => line.number)).to.equal(true)
        expect(lines.every((line) => line.hex)).to.equal(true)
        done()
      })
    })
  })

  describe('GET /files/data using file Name query params', () => {
    const BASE_ROUTE = '/files/data'

    describe('Passing test1.csv', () => {
      const fileName = 'test1.csv'
      const ROUTE_WITH_FILENAME = `${BASE_ROUTE}?fileName=${fileName}`
      it('Should get a response with status code 404 - File is empty', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response).to.have.status(404)
          expect(response.body).to.be.an('object')
          done()
        })
      })

      it('Should get a response with valid ok property - ok has to be false', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response.body).to.have.property('ok')
          expect(response.body.ok).to.equal(false)
          done()
        })
      })

      it('Should returns an error message to client', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response.body).to.have.property('msg')
          expect(response.body.msg)
            .to.be.a('string')
            .that.equal(
              'Lines of files could not be found or its content is invalid'
            )
          done()
        })
      })
    })

    describe('Passing test2.csv', () => {
      const fileName = 'test2.csv'
      const ROUTE_WITH_FILENAME = `${BASE_ROUTE}?fileName=${fileName}`
      it('Should get a response with status code 200', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('object')
          done()
        })
      })

      it('Should get a response with valid ok property - ok has to be true', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response.body).to.have.property('ok')
          expect(response.body.ok).to.equal(true)
          done()
        })
      })

      it('Should returns an object because data is filtered to one file by its name', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response.body.files).to.be.an('object')
          done()
        })
      })

      it('Should returns just one line as file content', (done) => {
        requester.get(ROUTE_WITH_FILENAME).end((error, response) => {
          if (error) return done(error)
          expect(response.body.files.lines).to.have.length(1)
          done()
        })
      })
    })
  })
})

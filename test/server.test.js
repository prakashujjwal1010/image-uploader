process.env.NODE_ENV = 'test';

const server = require('../server.js');
const request = require('supertest');


describe('testing server', () => {

  describe('GET /', (done)=>{

    it('should respond with correct status code', (done)=>{
      request(server)
        .get('/')
        .expect(200, done);
    });
  });
  describe('POST /api/upload', () => {

    it('should response with correct status code', (done) => {
      request(server)
        .post('/api/upload')
        .field('Content-Type', 'multipart/form-data')
        .attach("encryptedImg", "../sample.jpg")
        .expect(200)
        .expect({
          success : true
        })
        .end((err) => {
          if(err) return done(err);
          done();
        });
    });
  });
});

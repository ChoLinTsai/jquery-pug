const request = require('supertest');
const app = require('../app.js');


// Login api test
describe('POST /auth/login', () => {
  it('Login Route should be working.', (done) => {
    request(app)
      .post('/auth/login')
      .set("Content-Type", "application/json")
      .send({ "user_id": "Tony", "user_pw": "1233" })
      .expect(200)
      .end(done)
  })
});

// Logout api test
describe('GET /auth/logout', () => {
  it('Logout Route should be working.', (done) => {
    request(app)
      .get('/auth/logout')
      .set("Content-Type", "application/json")
      .expect(200)
      .end(done)
  })
});
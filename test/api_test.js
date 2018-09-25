const request = require('supertest');
const app = require('../app.js');

let testID;

// Home route api test
describe('GET / ', () => {
  it('index home page', (done) => {
    request(app)
      .get('/')
      .set("Content-Type", "application/json")
      .expect(200)
      .end(done)
  })
});


// userPage get all users api test
describe('GET /userPage', () => {
  it('userPage get all users data', (done) => {
    request(app)
      .get('/userPage')
      .set("Content-Type", "application/json")
      .expect(200)
      .end(done)
  })
});


// userPage create user api test
describe('POST /api/users', () => {
  it('userPage create a new user.', (done) => {
    request(app)
      .post('/api/users')
      .set("Content-Type", "application/json")
      .expect(200)
      .expect(res => {
        testID = res.body.insertId;
      })
      .end(done)
  })
});



// userPage get user api test
describe('GET /users/:id', () => {
  it('userPage get a edit user data.', (done) => {
    request(app)
      .get(`/api/users/${testID}`)
      .set("Content-Type", "application/json")
      .expect(200)
      .end(done)
  })
});


// userPage edit a user api test
describe('PUT /users/:id', () => {
  it('userPage get a edit user data.', (done) => {
    request(app)
      .put(`/api/users/${testID}`)
      .set("Content-Type", "application/json")
      .send({
        "id": "",
        "first_name": "",
        "last_name": "",
        "password": "",
        "email": "",
      })
      .expect(200)
      .end(done)
  })
});


// userPage delete a user data api test
describe('DELETE /users/:id', () => {
  it('userPage get a edit user data.', (done) => {
    request(app)
      .delete(`/api/users/${testID}`)
      .set("Content-Type", "application/json")
      .expect(200)
      .end(done)
  })
});


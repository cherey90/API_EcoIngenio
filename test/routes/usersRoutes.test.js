const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const User = require('../../models/User');
const { ROLES_LIST } = require('../../config/roles_list');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Users Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const user1 = new User({ username: 'user1', password: 'password1' });
      const user2 = new User({ username: 'user2', password: 'password2' });
      await user1.save();
      await user2.save();

      const res = await chai.request(app).get('/users');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0]).to.have.property('username', 'user1');
      expect(res.body[1]).to.have.property('username', 'user2');
    });

    it('should return 204 if no users found', async () => {
      const res = await chai.request(app).get('/users');

      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const existingUser = new User({ username: 'user1', password: 'password1' });
      await existingUser.save();

      const res = await chai.request(app).get(`/users/${existingUser._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username', 'user1');
    });

    it('should return 400 if user ID is missing', async () => {
      const res = await chai.request(app).get('/users/:id');

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'User ID required');
    });

    it('should return 204 if user ID not found', async () => {
      const res = await chai.request(app).get('/users/nonexistentid');

      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const user = { username: 'newuser', password: 'password' };

      const res = await chai.request(app).post('/users').send(user);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username', 'newuser');
      expect(res.body).to.have.property('_id');
    });

    it('should return 400 if username is missing', async () => {
      const user = { password: 'password' };

      const res = await chai.request(app).post('/users').send(user);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Username is required');
    });

    it('should return 400 if password is missing', async () => {
      const user = { username: 'newuser' };

      const res = await chai.request(app).post('/users').send(user);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Password is required');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const existingUser = new User({ username: 'user1', password: 'password1' });
      await existingUser.save();

      const updatedUser = { username: 'updateduser', password: 'newpassword' };

      const res = await chai.request(app).put(`/users/${existingUser._id}`).send(updatedUser);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('username', 'updateduser');
      expect(res.body).to.have.property('_id', existingUser._id.toString());
    });

    it('should return 400 if user ID is missing', async () => {
      const updatedUser = { username: 'updateduser', password: 'newpassword' };

      const res = await chai.request(app).put('/users/:id').send(updatedUser);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'User ID required');
    });

    it('should return 204 if user ID not found', async () => {
      const updatedUser = { username: 'updateduser', password: 'newpassword' };

      const res = await chai.request(app).put('/users/nonexistentid').send(updatedUser);

      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const existingUser = new User({ username: 'user1', password: 'password1' });
      await existingUser.save();

      const res = await chai.request(app).delete(`/users/${existingUser._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('ok', 1);
      expect(res.body).to.have.property('deletedCount', 1);
    });

    it('should return 400 if user ID is missing', async () => {
      const res = await chai.request(app).delete('/users/:id');

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'User ID required');
    });

    it('should return 204 if user ID not found', async () => {
      const res = await chai.request(app).delete('/users/nonexistentid');

      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
  });
}).timeout(10000); // Aumentar el timeout a 5000ms

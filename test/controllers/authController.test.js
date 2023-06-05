// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;

// const { handleLogin } = require('../../controllers/authController');
// const User = require('../../models/User');
// const { generateToken } = require('../../middleware/authMiddleware');

// chai.use(chaiHttp);

// describe('Auth Controller', () => {
//   describe('POST /login', () => {
//     it('should return 400 if username and password are missing', async () => {
//       const res = await chai.request(app).post('/login');

//       expect(res).to.have.status(400);
//       expect(res.body).to.have.property('message', 'Username and password are required.');
//     });

//     it('should return 401 if user is not found', async () => {
//       const res = await chai
//         .request(app)
//         .post('/login')
//         .send({ user: 'nonexistent_user', pwd: 'password' });

//       expect(res).to.have.status(401);
//     });

//     it('should return 401 if password is incorrect', async () => {
//       const user = new User({
//         username: 'test_user',
//         password: 'incorrect_password',
//       });
//       await user.save();

//       const res = await chai
//         .request(app)
//         .post('/login')
//         .send({ user: 'test_user', pwd: 'password' });

//       expect(res).to.have.status(401);
//     });

//     it('should return access token and set refresh token cookie if login is successful', async () => {
//       const user = new User({
//         username: 'test_user',
//         password: 'password',
//       });
//       await user.save();

//       const token = generateToken(user._id);

//       const res = await chai
//         .request(app)
//         .post('/login')
//         .send({ user: 'test_user', pwd: 'password' })
//         .set('Authorization', token);

//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('accessToken');
//       expect(res).to.have.cookie('jwt');

//       const accessToken = res.body.accessToken;

//       // Utilizar accessToken en pruebas adicionales si es necesario
//       // ...

//       // Ejemplo: Probar una ruta protegida utilizando el accessToken
//       const protectedRes = await chai
//         .request(app)
//         .get('/protected-route')
//         .set('Authorization', accessToken);

//       expect(protectedRes).to.have.status(200);
//       expect(protectedRes.body).to.have.property('message', 'Protected route accessed successfully');
//     });
//   });
// });

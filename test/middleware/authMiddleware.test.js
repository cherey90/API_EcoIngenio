// const chai = require('chai');
// const expect = chai.expect;
// const jwt = require('jsonwebtoken');

// const { generateToken } = require('../../middleware/authMiddleware');

// describe('Auth Middleware', () => {
//   describe('generateToken', () => {
//     it('should generate a valid JWT token', () => {
//       const userId = '123456789';
//       const token = generateToken(userId);

//       // Verificar si el token es una cadena no vacía
//       expect(token).to.be.a('string').that.is.not.empty;

//       // Verificar si el token es válido decodificándolo
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       expect(decodedToken).to.be.an('object');
//       expect(decodedToken.userId).to.equal(userId);
//     });
//   });

//   // Agrega más pruebas para otras funciones de authMiddleware si es necesario
// });

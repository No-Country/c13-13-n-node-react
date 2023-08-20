require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.AUTH_SECRET;

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Caducidad del token: 1 hora
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return 'token no válido';
    }
  },
};
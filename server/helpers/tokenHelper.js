// /helpers/tokenHelper.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateVerificationToken = () => {
  const secretKey = 'yourSecretKey'; // Güvenli bir anahtar kullanın
  const expiresIn = '1d'; // Token süresi (1 gün)

  const token = jwt.sign({}, secretKey, { expiresIn });
  return token;
};


const generateAccessToken = (userData) => {
  const secretKey = process.env.SECRET; // Güvenli bir anahtar kullanın
  const expiresIn = '1h'; // Token süresi (1 saat)

  // Kullanıcı bilgileri payload olarak token'a eklenir
  const token = jwt.sign(userData, secretKey, { expiresIn });
  return token;
};



module.exports = { generateVerificationToken , generateAccessToken};

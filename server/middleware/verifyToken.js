// middleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  

  if (!token) {
    return res.status(401).json({ error: 'Token bulunamadı' });
  }



  try { 
    
    const decodedToken = jwt.verify(token,process.env.SECRET); //  decodedToken değişkenine token'ın çözümlenmiş (decoded) hali atanır.
     //sconsole.log(decodedToken);
   

    req.userData = decodedToken; //Doğrulanan token'ın çözümlenmiş hali (decodedToken), req.userData içerisine atanır. Bu, sonraki middleware veya route işlemlerinde kullanılabilir. 
    
    next();
    
  } catch (error) {
    console.error('Token doğrulama hatası:', error.message);
    res.status(401).json({ error: 'Geçersiz token' });
    
  }
};

module.exports = verifyToken;

// dosya yolunu belli et usercontrollerdakilerin
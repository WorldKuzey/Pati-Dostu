const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const verifyToken = require('../middleware/verifyToken'); 

//Doğrulama  Routerları

// Hesap doğrulama sayfası
router.get('/dogrula/:verificationToken', authController.dogrulama);



//CallBack Route Fonksiyonu
router.get('/caretaker-page', verifyToken, (req, res) => {
    // Eğer buraya ulaşıyorsa, token doğrulama başarılı olmuştur
    res.json({ success:true , message: 'Token doğrulama başarılı', userData: req.userData });//doğrulama başarılı bunu mu kullanıcım clientta giriş yapabilmek için? bu cevabı nasıl kullanıcam?
    console.log("başarılı");
  });
  
  module.exports = router;


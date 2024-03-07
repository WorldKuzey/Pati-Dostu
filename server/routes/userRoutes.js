// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Kullanıcı rotalarını tanımla
router.post('/kaydol', userController.kaydol);

// Kullanıcı oturum açma
router.post('/', userController.giris);

//normal routerlar

// Logout endpoint'i ilerde düzenlemek için yarım bıraktım ÇIKIŞ işlemini sadece client kısmında yapıcam şu an
//router.post('/cikis',  userController.cikisYap);


module.exports = router;

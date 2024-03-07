const express = require('express');
const router = express.Router();
const multer = require('multer');
//const path = require('path');

const caretakerController = require('../controllers/caretakerController');

// Multer ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Dosyaların kaydedileceği dizin
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Dosya adı formatı
    },
    
  });


  


const upload = multer({ storage: storage });

// Bakıcı profili ekleme endpoint'i
router.post('/add-caretaker-profile', upload.array('images', 5), caretakerController.addCaretakerProfile);


// Bakıcı profillerini getir
router.get('/view-caretakers', caretakerController.getCaretakerProfiles);






module.exports = router;

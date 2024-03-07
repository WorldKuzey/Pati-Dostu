const express = require('express');
const router = express.Router();
const multer = require('multer');
const announcementController = require('../controllers/announcementsController');

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




// İlan oluşturma endpoint'i
router.post('/create-announcement', upload.array('images', 5), announcementController.addAnnouncement);



module.exports = router;

// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/view-caretakers', async (req, res) => {
  try {
    const data = req.body;
    const savedMessage = await messageController.saveMessage(data);

    // İstekte başarılı olunduğunu ve kaydedilen mesajı geri döndüren bir yanıt gönderin
    res.status(201).json({ success: true, message: 'Mesaj başarıyla gönderildi.', data: savedMessage });
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);

    // Hata durumunda uygun bir yanıt gönderin
    res.status(500).json({ success: false, message: 'Mesaj gönderirken bir hata oluştu.' });
  }
});


// Mesajları almak için endpoint
router.get('/message-caretaker', messageController.getMessages);




router.get('/inbox', messageController.getMessages);




module.exports = router;

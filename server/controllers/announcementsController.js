const Announcement = require('../models/Announcement');
const multer = require('multer');

// Multer örneğini oluşturun
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller function to add a new announcement
const addAnnouncement = async (req, res) => {
  try {
    // Form verileri
    const { petName, petType, petInfo, petGender, petColor, petAge, vaccinationStatus } = req.body;

    // Yüklenen dosyalar
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));


    const newAnnouncement = new Announcement({
      petName,
      petType,
      petInfo,
      petGender,
      petColor,
      petAge,
      vaccinationStatus,
      images: images,
    });

    await newAnnouncement.save();


    res.status(201).json({ message: 'Announcement added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addAnnouncement,
};

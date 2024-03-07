const Caretaker = require('../models/CareTaker'); 

const addCaretakerProfile = async (req, res) => {
  const { name, experience, services, email, address } = req.body;

  // Dosya bilgilerini al
  const images = req.files.map(file => {
    return {
      filename: file.originalname,
      extension: file.originalname.split('.').pop(),
      path: file.path
    };
  });

  try {
    // Bakıcı profili veritabanına ekle
    const caretaker = new Caretaker({
      name,
      experience,
      services,
      email,
      address,
      images  // Dosya bilgilerini de ekleyin
    });

    await caretaker.save();

    res.status(201).json({ message: 'Caretaker profile added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCaretakerProfiles = async (req, res) => {
  try {
    // Bakıcı profillerini veritabanından getir
    const caretakers = await Caretaker.find();

    res.status(200).json({ caretakers });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addCaretakerProfile,
  getCaretakerProfiles
};



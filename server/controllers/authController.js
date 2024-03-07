const User = require('../models/User');
const { sendConfirmationEmail } = require('../helpers/emailHelper');




// Hesap doğrulama işlemi
exports.dogrulama = async (req, res) => {
  try {
    const verificationToken = req.params.verificationToken;

    // MongoDB'den kullanıcıyı bul
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ error: 'Geçersiz doğrulama bağlantısı' });
    }

    // Kullanıcıyı doğrula
    user.isVerified=true;
    user.verificationToken = null;
    await user.save();
    
    res.redirect('/');


     
     // Doğrulama başarılı e-postası gönderme işlemi
    await sendConfirmationEmail(user.email);
    
    console.log("Hesap doğrulandı");
  } catch (error) {
    console.error('Doğrulama sırasında hata:', error.message);
    res.status(500).json({ error: 'İç Sunucu Hatası' });
  }
};







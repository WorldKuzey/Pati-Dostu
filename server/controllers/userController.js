// /controllers/userController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateVerificationToken } = require('../helpers/tokenHelper');
const { generateAccessToken } = require('../helpers/tokenHelper');
const { sendVerificationEmail } = require('../helpers/emailHelper');



// Kullanıcı kaydı işlemi
exports.kaydol = async (req, res) => {
  try {
    const { email, password, accountType } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({ email, password: hashedPassword, accountType, verificationToken });
    await user.save();

    const subject = 'Hesap Doğrulama';
    await sendVerificationEmail(email, subject, verificationToken);

    res.status(200).json({ message: 'Kayıt başarılı. Lütfen e-postanızı kontrol edin ve hesabınızı doğrulayın.' });
  } catch (error) {
    console.error('Kayıt sırasında hata:', error.message);
    res.status(500).json({ error: 'İç Sunucu Hatası' });
  }
};

// Kullanıcı giriş işlemi
exports.giris = async (req, res) => { //request alır response veririr
  try {
    const { email, password } = req.body;

    // Kullanıcıyı e-posta ve hesap türüne göre bul
    const user = await User.findOne({ email });

  

    // Kullanıcı yoksa veya şifre uyuşmuyorsa hata dön
    if (!user || !(await bcrypt.compare(password, user.password)) || !user.isVerified) {
      return res.status(401).json({ error: 'Geçersiz e-posta, şifre veya hesap türü' });
    }

    // Kullanıcı bilgileri
    const userData = {  
      
      userId: user._id,
      email: user.email,
      hesap_turu: user.accountType,
    };
    
    console.log(userData.hesap_turu);
    // Access Token oluştur
    const accessToken = generateAccessToken(userData);

    // Access Token'i kullanıcıya gönder
    res.status(200).json({ accessToken , hesap_turu:user.accountType ,userId: user._id}); //burada respond olarak gönderdiğimiz şeyleri clien tarafında kullanabiliyoruz.
  } catch (error) {
    console.error('Oturum açma sırasında hata:', error.message);
    res.status(500).json({ error: 'İç Sunucu Hatası' });
  }
};

// Kullanıcı çıkış işlemi // İLERDE YAPILACAK BLACKLİST İLE ŞU ANLIK CLİENT KISMINDA LOGOUT İŞLEMİ OLUCAK
/*exports.cikisYap = async (req, res) => {
  try {
    
   
   
    req.userData.accessToken = null;


    res.status(200).json({ message: 'Çıkış başarılı' });
  } catch (error) {
    console.error('Çıkış yapma sırasında hata:', error.message);
    res.status(500).json({ error: 'İç Sunucu Hatası' });
  }
}; */

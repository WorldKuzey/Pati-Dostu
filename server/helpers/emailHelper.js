// /helpers/emailHelper.js
const nodemailer = require('nodemailer');
require('dotenv').config();
// env dosyasından çevresel değişkenlere erişim sağlama
const EMAIL_USER = process.env.EMAIL_USER ;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ;

const sendVerificationEmail = async (to, subject, verificationToken) => {
  try {
    const confirmationLink = `http://localhost:3000/dogrula/${verificationToken}`;
    const htmlContent = `Merhaba ${to}, <br> Hesabınızı doğrulamak ve giriş yapmak için lütfen <a href="${confirmationLink}">buraya tıklayın</a>.`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'denemebitirmeproje@gmail.com',
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-posta gönderildi:', info);

    return true;
  } catch (error) {
    console.error('E-posta gönderme hatası:', error.message);
    return false;
  }
};

const sendConfirmationEmail = async (to) => {
  try {
    const subject = 'Hesap Doğrulandı';
    const htmlContent = `Merhaba ${to}, <br> Hesabınız başarıyla doğrulandı. Artık giriş yapabilirsiniz.`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'denemebitirmeproje@gmail.com',
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Onay e-postası gönderildi:', info);

    return true;
  } catch (error) {
    console.error('Onay e-postası gönderme hatası:', error.message);
    return false;
  }
};
module.exports = { sendVerificationEmail, sendConfirmationEmail };

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'caregiver',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Eğer şifre veya şifreyi onayla alanına yeni bir değer atanıyorsa
    // ve şifreler uyuşmuyorsa, hata mesajını ayarla
    if ((name === 'password' || name === 'confirmPassword') && formData.password !== formData.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: 'Şifreler uyuşmuyor',
      });
    } else {
      // Eğer şifreler uyuşmuyorsa, hata mesajını temizle
      setFormErrors({
        ...formErrors,
        confirmPassword: '',
      });
    }

    // Diğer input alanları için aynı mantığı uygulayabilirsiniz

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // E-posta kontrolü
    if (!formData.email) {
      newErrors.email = 'E-posta boş bırakılamaz';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    } else {
      newErrors.email = '';
    }

    // Şifre kontrolü
    if (!formData.password) {
      newErrors.password = 'Şifre boş bırakılamaz';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    } else {
      newErrors.password = '';
    }

    // Şifre ile şifreyi onayla alanı kontrolü
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler uyuşmuyor';
    } else {
      newErrors.confirmPassword = '';
    }

    // Hataları formErrors state'ine kaydet
    setFormErrors(newErrors);

    // Hatalar varsa formu göndermeyi engelle
    setSubmitMessage('');
    if (Object.values(newErrors).some((error) => error !== '')) {
      setSubmitMessage('Lütfen formdaki hataları düzeltin.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {     //   HANDLE FONKSİYONU KENDİ OLUŞTURULMUŞ HANDLE SUBMİT ADINDA
    e.preventDefault();

    // Formu gönderme öncesi validasyon yap
    const isValid = validateForm();

    if (isValid) {
      try {
        // Form verilerini sunucuya gönder
        const response = await axios.post('http://localhost:3000/kaydol', formData, { // İLGİLİ SERVER'IN URLSİNE GÖNDERİİYOR DATA İLE
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Başarılı işlem
          console.log('Kayıt başarılı:', formData);
          setSubmitMessage('E-posta adresinize doğrulama maili gönderilmiştir!');
        } else {
          // Hata durumu
          console.error('Kayıt sırasında bir hata oluştu:', response.statusText);
          setSubmitMessage('Kayıt sırasında bir hata oluştu.');
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error.message);
        setSubmitMessage('Bu e-posta adresi kullanımda.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          <span className="bg-gradient-to-r text-transparent from-green-400 to-green-600 bg-clip-text">
            Pati Dostu Ol
          </span>
        </h1>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              E-posta
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-${formErrors.email ? 'red-500' : 'gray-300'} focus:border-green-500 transition duration-300 px-3 py-2`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-${formErrors.password ? 'red-500' : 'gray-300'} focus:border-${formErrors.confirmPassword ? 'red-500' : 'green-500'} transition duration-300 px-3 py-2`}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Şifreyi Onayla
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-${formErrors.confirmPassword ? 'red-500' : formData.confirmPassword ? 'green-500' : 'gray-300'} focus:border-green-500 transition duration-300 px-3 py-2`}
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="accountType">
              Hesap Türü
            </label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              className="bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-gray-300 focus:border-green-500 transition duration-300 px-3 py-2"
            >
              <option value="caregiver">Bakıcı</option>
              <option value="petOwner">Evcil Hayvan Sahibi</option>
            </select>
          </div>
          <button
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-300"
            type="submit"
          >
            Kaydol
          </button>

          {submitMessage && (
            <p className={`mt-2 text-sm ${submitMessage.includes('başarılı') ? 'text-green-500' : 'text-red-500'}`}>
              {submitMessage}
            </p>
          )}
        </form>

        <div className="max-w-lg mx-auto text-center mt-8 mb-4">
          <p className="text-gray-600">
            Zaten bir hesabınız var mı?{' '}
            <Link to="/" className="font-semibold hover:underline">
              Giriş yapın
            </Link>
            .
          </p>
        </div>

        <footer className="flex justify-center text-gray-600 text-sm">
          <Link to="/contact" className="hover:underline">
            İletişim
          </Link>
          <span className="mx-2">•</span>
          <Link to="/privacy" className="hover:underline">
            Gizlilik
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default CustomRegister;

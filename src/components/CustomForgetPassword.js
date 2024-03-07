import React from 'react';
import { Link } from 'react-router-dom';

const CustomForgetPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada e-posta adresini kullanarak parola sıfırlama talebi gönderilebilir.
    console.log('Parola sıfırlama talebi gönderildi.');
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          <span className="bg-gradient-to-r text-transparent from-green-600 to-teal-500 bg-clip-text">
            Pati Dostu
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
              className="bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-gray-300 focus:border-green-500 transition duration-300 px-3 py-2"
            />
          </div>
          <button
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-300"
            type="submit"
          >
            Parolayı Sıfırla
          </button>
        </form>

        <div className="max-w-lg mx-auto text-center mt-8 mb-4">
        <p className="text-gray-600">
            Hesabınızı hatırladınız mı?{' '}
            {/* Giriş yapın linki */}
            <Link to="/" className="font-semibold hover:underline">
              Giriş yapın
            </Link>
            .
          </p>
        </div>

        <footer className="flex justify-center text-gray-600 text-sm">
          <a href="/contact" className="hover:underline">İletişim</a>
          <span className="mx-2">•</span>
          <a href="/privacy" className="hover:underline">Gizlilik</a>
        </footer>
      </div>
    </div>
  );
};

export default CustomForgetPassword;

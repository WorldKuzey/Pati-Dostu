
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';



const CustomLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitMessage, setSubmitMessage] = useState(''); // Yeni eklenen state
  const navigate = useNavigate();
  const { login } = useAuth();
  


  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post('http://localhost:3000', data); //     Token oluşturulur sunucuya o kullanıcı var mı diye kontrol etmesi için gönderilir
      
      //SET 
      //const localStorageKey = response.data.userId;
      login(response.data.accessToken, response.data.userId); 
      

      // SET ETTİĞİNİ GET'İREN KISIM
      const storedAccessToken = localStorage.getItem(response.data.userId, response.data.accessToken);

    
     

  
    

      const response2 = await axios.get('http://localhost:3000/caretaker-page', {
  headers: {
    Authorization: `${storedAccessToken}`,
    //Bearer'ı sildim ?
  },
}); 



  console.log(response2.data.message);
// Token doğrulama başarılı ise sayfaya yönlendir
if (response2) { 

  
  if (response.data.hesap_turu === 'caregiver') {
    console.log("Bakıcı");
    navigate(`/caretaker-page/${response.data.userId}`);

    
  } else if (response.data.hesap_turu === 'petOwner') {
    console.log("Sahip");
    navigate(`/petowner-page/${response.data.userId}`);
  }
}



     } catch (error) {
      console.error('Giriş hatası:', error.message);
      // Eposta veya şifre hatalı ise
    setSubmitMessage('E-posta veya şifre hatalı');

  


    } 
  };

  


  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          <span className="bg-gradient-to-r text-transparent from-green-400 to-green-600 bg-clip-text">
            Pati Dostu
          </span>
        </h1>
        <form className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              E-posta
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-gray-300 focus:border-green-500 transition duration-300 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded w-full text-gray-800 focus:outline-none border-b-2 border-gray-300 focus:border-green-500 transition duration-300 px-3 py-2"
            />
          </div>
         

          <div className="mb-4">
            {/* Şifrenizi mi unuttunuz? link */}
            <Link to="/sifre-sifirla" className="text-sm text-green-600 hover:underline mb-2 ">
              Şifrenizi mi unuttunuz?
            </Link>
          </div>
           


          <button
            type="button"
            className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-300"
            onClick={handleLogin}
          >
            Giriş Yap
          </button>

{/* ... (existing code) */}
{submitMessage && (
            <div className="mb-4 text-red-500 text-sm">{submitMessage}</div>
          )}
          {/* ... (existing code) */}
          
       
        </form>
        <div className="max-w-lg mx-auto text-center mt-8 mb-4">
          <p className="text-gray-600">
            Hesabınız yok mu? <Link to="/kaydol" className="font-semibold hover:underline">Kaydolun</Link>.
          </p>

          
        </div>



      
        <footer className="flex justify-center text-gray-600 text-sm">
          <a href="#" className="hover:underline">İletişim</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:underline">Gizlilik</a>
        </footer>
      </div>
    </div>
  );
};

export default CustomLogin;

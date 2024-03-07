// App.js


import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';

import LoginPage from './pages/LoginPage'; // Doğru yolu belirtmelisiniz

import ForgetPasswordPage from './pages/ForgetPasswordPage';

import CareTakerHomePage from './pages/CareTakerHomePage';

import PetOwnerHomePage from './pages/PetOwnerHomePage';

import AboutUsPage from './pages/AboutUsPage';

import ContactUsPage from './pages/ContactUsPage';

import CreateAnnouncementPage from './pages/CreatAnnouncementPage';

import CreateCareTakerProfilePage from './pages/CreateCareTakerProfilePage';

import InboxPage from './pages/InboxPage';

import MessageCareTakerPage from './pages/MessageCareTakerPage';

import ViewCareTakersPage from './pages/ViewCareTakersPage';

import { AuthProvider } from './context/AuthContext';



const App = () => {
  return (

    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/kaydol" element={<RegisterPage />} />
        <Route path="/sifre-sifirla" element={<ForgetPasswordPage />} />
        <Route path="/petowner-page/:userId" element={<PetOwnerHomePage />} />
        <Route path="/caretaker-page/:userId" element={<CareTakerHomePage />} />
        <Route path="/hakkimizda" element={<AboutUsPage />} />
        <Route path="/iletisim" element={<ContactUsPage />} />
        <Route path="/add-caretaker-profile" element={<CreateCareTakerProfilePage/>}/>
        <Route path="/inbox" element={<InboxPage/>}/>
        <Route path="/create-announcement" element={<CreateAnnouncementPage/>}/>
        <Route path="/view-caretakers" element={<ViewCareTakersPage/>}/>
        <Route path="/message-caretaker" element={<MessageCareTakerPage/>}/>





      </Routes>
      </AuthProvider>
  </Router>
  );


};

export default App;



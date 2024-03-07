// pages/PetOwnerHome.js

import React from "react";
import PetOwnerDashboard from '../components/PetOwnerDashboard'; // Dosyanın gerçek yolunu doğru şekilde belirtmelisiniz.
import Header from '../components/Header';
import Footer from "../components/Footer";
const PetOwnerHome = () => {
  return (
    <div>
      
      <Header/>
      <PetOwnerDashboard/>
      <Footer/>
      
    </div>
  );
};

export default PetOwnerHome;

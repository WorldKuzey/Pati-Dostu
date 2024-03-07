// pages/CaretakerHome.js

import React from "react";
import CaretakerDashboard from '../components/CareTakerDashboard'; // Dosyanın gerçek yolunu doğru şekilde belirtmelisiniz.
import Header from '../components/Header';
import Footer from "../components/Footer";

const CaretakerHome = () => {
  return (
    <div>
      
      <Header/>
      <CaretakerDashboard/>
      <Footer/>
    </div>
  );
};

export default CaretakerHome;




//import PrivateRoute from '../components/PrivateRoute'; // PrivateRoute bileşenini ekleyin


import React   from "react";
import AboutUs from '../components/AboutUs'; // Dosyanın gerçek yolunu doğru şekilde belirtmelisiniz.
import Header from '../components/Header';
import Footer from "../components/Footer";

const Aboutus = () => {
  return (

    <div>
      <Header/>
      <AboutUs/>
      <Footer/>
    </div>
 
 );
};

export default Aboutus;

//   <PrivateRoute element={<div> {/* Dilerseniz buraya AboutUs bileşenini ekleyebilirsiniz */}</div>} />

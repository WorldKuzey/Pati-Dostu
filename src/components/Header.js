
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      
      
    
       logout(); //
      
      
      
     window.location.href = '/';
    } catch (error) {
      // Hata durumunda işlemleri burada yapabilirsin
      console.error('Çıkış hatası:', error.message);
    }
   
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Pati Dostu Logo" className="h-14" />
        </Link>

        <nav className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-200">
            Anasayfa
          </Link>
          <Link to="/iletisim" className="hover:text-gray-200">
            İletişim
          </Link>
          <Link to="/hakkimizda" className="hover:text-gray-200">
            Hakkımızda
          </Link>

          {/* Profil Menüsü */}
          <div className="relative inline-block text-left" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="flex items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profil
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <Link
                    to="/profil-duzenle"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Profil Düzenle
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Oturumu Kapat
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

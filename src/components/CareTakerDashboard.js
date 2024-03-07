import React from "react";
import { Link } from "react-router-dom";

const CaretakerDashboard = () => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      <div className="container mx-auto p-8 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz!</h1>
        <p className="mb-8">
          Bakıcı olarak, aşağıdaki seçeneklere erişiminiz var:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/add-caretaker-profile" className="hover:transform hover:scale-105 transition-transform">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Bakıcı Profilini Yayınla</h2>
              <p>Bakıcı Profilinizi  düzenleyin  ve yayınlayın.</p>
            </div>
          </Link>

          <Link to="/inbox" className="hover:transform hover:scale-105 transition-transform">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Gelen Mesajlar</h2>
              <p>Müşterilerden gelen mesajları kontrol edin ve yanıtlayın.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard;

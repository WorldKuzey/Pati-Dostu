import React from "react";
import { Link } from "react-router-dom";

const PetOwnerDashboard = () => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      <div className="container mx-auto p-8 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz!</h1>
        <p className="mb-8">
          Evcil hayvan sahibi olarak, aşağıdaki seçeneklere erişiminiz var:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/create-announcement" className="hover:transform hover:scale-105 transition-transform">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">İlan Oluştur</h2>
              <p>Evlat edinilmek üzere ilan oluşturun.</p>
            </div>
          </Link>

          <Link to="/view-caretakers" className="hover:transform hover:scale-105 transition-transform">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Bakıcıları Görüntüle</h2>
              <p>Alanında uzman bakıcıları inceleyin.</p>
            </div>
          </Link>

          <Link to="/message-caretaker" className="hover:transform hover:scale-105 transition-transform">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Bakıcıyla Mesajlaş</h2>
              <p>İlgilendiğiniz bakıcılarla iletişime geçin.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetOwnerDashboard;

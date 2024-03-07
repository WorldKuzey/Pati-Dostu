import React from 'react';

const ContactUs = () => {
  return (

    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
    <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6">İletişim</h1>
      <p className="text-lg leading-relaxed">
        Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
      </p>
      <div className="mt-4">
        <p className="text-lg font-bold">E-posta:</p>
        <p className="text-lg">info@patidostu.com</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold">Telefon:</p>
        <p className="text-lg">+90 (XXX) XXX XX XX</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold">Adres:</p>
        <p className="text-lg">Pati Dostu Merkezi, İstanbul, Türkiye</p>
      </div>
    </div>
  </div>
  );
};

export default ContactUs;

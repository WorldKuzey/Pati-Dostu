import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ReviewCaretakers = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [newMessages, setNewMessages] = useState({}); // Her caretaker için ayrı bir state kullanılacak

  const socket = io('http://localhost:3000');
  

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/view-caretakers');
        const initialMessages = {};
        response.data.caretakers.forEach((caretaker) => {
          initialMessages[caretaker._id] = []; // Her caretaker için boş bir mesaj dizisi oluştur
        });
        setCaretakers(response.data.caretakers);
        setNewMessages(initialMessages);
      } catch (error) {
        console.error('Bakıcıları alma hatası:', error);
      }
    };

    fetchCaretakers();
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      // Mesajın içeriğini ve gönderen bilgilerini konsolda göster
      console.log(`Yeni mesaj alındı:
        Gönderen: ${data.sender}
        Mesaj: ${data.text}
        Bakıcı Bilgileri: ${JSON.stringify(data.caretakerInfo)}
      `);

      // Alınan mesajları ilgili caretaker'ın state'ine ekleyin
      setNewMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        updatedMessages[data.caretakerInfo._id] = [
          ...prevMessages[data.caretakerInfo._id],
          { sender: data.sender, text: data.text, caretakerInfo: data.caretakerInfo },
        ];
        return updatedMessages;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSendMessage = (e, caretakerId) => {
    e.preventDefault();

    // Gönderilen ilana ait bilgileri mesajla birlikte gönder
    const selectedCaretaker = caretakers.find((caretaker) => caretaker._id === caretakerId);
    const messageData = {
      sender: 'Evcil Sahip',
      text: newMessages[caretakerId] || '',
      caretakerInfo: {
        _id: selectedCaretaker._id,
        name: selectedCaretaker.name,
        // Diğer bilgileri ekleyin
      },
    };
// handleSendMessage fonksiyonu içinde
axios.post('http://localhost:3000/view-caretakers', messageData)
  .then(response => {
    console.log('Mesaj başarıyla kaydedildi:', response.data);
    // İşlemlerinize devam edebilirsiniz, örneğin, kullanıcıya bir bildirim gösterme
  })
  .catch(error => {
    console.error('Mesaj kaydetme hatası:', error);
    // Hata durumunda kullanıcıya bir bildirim gösterme veya uygun bir işlem yapma
  });


    // Yeni mesajı Socket.IO server'a gönder
    socket.emit('message', messageData);

    

    // Mesaj alanını temizleyin
    setNewMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      updatedMessages[caretakerId] = ''; // Gönderildikten sonra mesaj alanını temizle
      return updatedMessages;
    });
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-6">Bakıcıları Gözden Geçirme</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caretakers.map((caretaker) => (
            <div key={caretaker._id} className="bg-white rounded-md overflow-hidden shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{caretaker.name}</h2>
                 
                  {caretaker.images.map((image, index) => (
                    <img
                      key={index}
                      src={`/${image.path.replace(/\\/g, '/')}`}
                      alt={caretaker.name}
                      className="w-20 h-20 rounded-full"
                    />
                  ))}        
                </div>
                <div className="text-gray-600 mb-4">
                  <p>Deneyim: {caretaker.experience}</p>
                  <p>Hizmetler: {caretaker.services.join(', ')}</p>
                  <p>Email: {caretaker.email}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 flex justify-end">
                <form onSubmit={(e) => handleSendMessage(e, caretaker._id)} className="flex flex-col items-end">
                  <textarea
                    value={newMessages[caretaker._id] || ''}
                    onChange={(e) => setNewMessages((prevMessages) => ({ ...prevMessages, [caretaker._id]: e.target.value }))}
                    placeholder="Mesajınızı yazın..."
                    className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-green-500 transition duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-4 rounded-full font-bold mt-2 shadow-lg hover:shadow-xl transition duration-300 self-end"
                  >
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCaretakers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Sunucu adresini buraya ekleyin

const ContactedCaretakers = () => {
  const [contactedCaretakers, setContactedCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const fetchContactedCaretakers = async () => {
      try {

        const response = await axios.get('http://localhost:3000/inbox');
        setContactedCaretakers(response.data.contactedCaretakers);
      } catch (error) {
        console.error('İletilen bakıcıları alma hatası:', error);
      }

    };

    fetchContactedCaretakers();
  }, []); 

  useEffect(() => {
    // WebSocket üzerinden gelen mesajları dinle
    socket.on('message', (data) => {
      setReceivedMessages((prevMessages) => ({
        ...prevMessages,
        [data.caretakerId]: [...(prevMessages[data.caretakerId] || []), { sender: 'Siz', text: data.message }],
      }));
    });

    return () => {
      // Component kaldırıldığında WebSocket bağlantısını kapat
      socket.disconnect();
    };
  }, []); // Sadece bir kere çalışması için boş bağımlılık dizisi

  const handleSendMessage = async () => {
    if (!selectedCaretaker) {
      return; // Eğer bir bakıcı seçilmediyse göndermeyi durdur
    }

    const caretakerId = selectedCaretaker._id;

    try {
      await axios.post('http://localhost:3000/inbox', {
        caretakerId,
        message,
      });

      setSentMessages([...sentMessages, { caretakerId, message }]);
      setMessage('');

      // Yeni gönderilen mesajı WebSocket aracılığıyla sunucuya bildir
      socket.emit('message', { caretakerId, message });
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    }
  };

  const shownCaretakerNames = new Set();

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex">
      <div className="w-1/4 bg-gray-200 overflow-y-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Gelen Mesajlar</h1>
        {contactedCaretakers.map((contactedCaretaker) => {
          // Eğer bu isim daha önce gösterildiyse, bu kartı gösterme
          if (shownCaretakerNames.has(contactedCaretaker.caretakerInfo.name)) {
            return null;
          }

          // Daha önce gösterilmediyse, bu kartı göster ve ismi set'e ekle
          shownCaretakerNames.add(contactedCaretaker.caretakerInfo.name);
          return (
            <div
              key={contactedCaretaker._id}
              className={`bg-white rounded-md overflow-hidden shadow-md mb-4 cursor-pointer transition duration-300} ${
                selectedCaretaker && selectedCaretaker._id === contactedCaretaker._id ? 'bg-gray-100' : ''
              }`}
              onClick={() => {
                setSelectedCaretaker(contactedCaretaker);
                setActiveChat(contactedCaretaker._id);
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{contactedCaretaker.sender}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-grow p-8">
        {activeChat ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sohbet Penceresi - {selectedCaretaker.sender}</h2>
            <div className="bg-white rounded-md overflow-hidden shadow-md p-6">
              {/* Aynı bakıcıya gelen tüm mesajları tek bir kart üzerinde göster */}
              {(receivedMessages[selectedCaretaker.caretakerInfo.name] || [])
                .map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.sender || 'Siz'}:</strong> {msg.text}
                  </div>
                ))}
              {/* Seçilen bakıcının doğrudan text özelliğini kullanarak mesaj içeriğini gösterme */}
              {selectedCaretaker.text && (
                <div className="mb-2">
                  <strong>{selectedCaretaker.sender}:</strong> {selectedCaretaker.text}
                </div>
              )}
            </div>

            <div className="flex items-center mt-4">
              <input
                type="text"
                className="flex-grow border border-gray-300 p-2 rounded-md mr-2"
                placeholder="Mesajınızı yazın"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <BsArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Lütfen bir bakıcı seçin.</p>
        )}
      </div>
    </div>
  );
};

export default ContactedCaretakers;

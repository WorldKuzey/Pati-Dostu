// controllers/messageController.js

const Message = require('../models/Message');

exports.saveMessage = async (data) => {
  try {
    const { sender, text, caretakerInfo } = data;
    const message = new Message({ sender, text, caretakerInfo });
    await message.save();
    return message;
  } catch (error) {
    console.error('Mesaj kaydetme hatası:', error);
    throw error;
  }
};





// Mesajları almak için bir controller
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ contactedCaretakers: messages }); // Burada alan adını contactedCaretakers olarak değiştirin
  } catch (error) {
    res.status(500).json({ error: 'Mesajlar alınamadı.' });
  }};
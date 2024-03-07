// models/message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  caretakerInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true, // Mesajın oluşturulma ve güncelleme zamanlarını otomatik olarak ekler
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

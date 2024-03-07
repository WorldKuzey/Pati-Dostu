const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  services: { type: Array, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  images: [
    {
      filename: { type: String },
      extension: { type: String },
      path: { type: String }
    }
  ]
});

const Caretaker = mongoose.model('Caretaker', caretakerSchema);

module.exports = Caretaker;

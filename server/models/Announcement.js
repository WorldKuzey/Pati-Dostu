// models/Announcement.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  file: {
    data: Buffer,
    contentType: String,
  },
});

const announcementSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    required: true,
  },
  petInfo: {
    type: String,
    required: true,
  },
  images: [imageSchema],
  petGender: {
    type: String,
    enum: ['male', 'female', 'neutered'],
    required: true,
  },
  petColor: {
    type: String,
    required: true,
  },
  petAge: {
    type: Number,
    required: true,
  },
  vaccinationStatus: {
    type: String,
    enum: ['upToDate', 'notUpToDate'],
    required: true,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

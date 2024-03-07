// .env dosyasındaki değerleri kullanabilmek için dotenv paketini yükleyin.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const caretakerRoutes = require('./routes/caretakerRoutes')
const messageRoutes = require('./routes/messageRoutes')

const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;


io.on('connection', (socket) => {
  //console.log('Kullanıcı bağlandı');

  socket.on('disconnect', () => {
    //console.log('Kullanıcı ayrıldı');
  });

  socket.on('message', (data) => {
    console.log('Yeni mesaj:', data);
    // Mesajı tüm bağlı istemcilere yayınla
    io.emit('message', data);
  });
});



// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI,);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
  console.log('MongoDB\'ye bağlandı');
});

// Ara Yazılım (Middleware)
app.use(bodyParser.json());

// React uygulamasının build edilmiş dosyalarını sunucuya ekle
app.use(express.static(path.join(__dirname, '../build')));


// Statik dosyaları servis etmek için middleware ekleyin
app.use('/uploads', express.static('uploads'));

// Kullanıcı rotalarını tanımla
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',announcementRoutes);
app.use('/',caretakerRoutes);
app.use('/',messageRoutes);



// React uygulamasının tüm istekleri için
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});




// Sunucuyu Başlat
//app.listen(PORT, () => {
  //console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
//});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

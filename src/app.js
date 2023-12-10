// app.js
const express = require('express');
<<<<<<< HEAD
=======
const firebase = require('firebase/app');
require('firebase/auth'); // 사용하는 서비스에 따라 필요한 모듈 추가
>>>>>>> 9dfe80089392804205b4f6856e93faf83c26bd3b
require('./config/firebaseConfig');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Firebase 앱 초기화
const firebaseConfig = {
    apiKey: "AIzaSyB4Agn8oAdo35BIN7tFw6raYAgw7DseoRs",
    authDomain: "findteammate-8edfd.firebaseapp.com",
    projectId: "findteammate-8edfd",
    storageBucket: "findteammate-8edfd.appspot.com",
    messagingSenderId: "39507522234",
    appId: "1:39507522234:web:6679741b6aa455edc84883",
    measurementId: "G-ZE0E5XQQYY"
};

firebase.initializeApp(firebaseConfig);

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/apply', applicationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
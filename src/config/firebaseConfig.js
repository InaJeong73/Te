/*
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyB4Agn8oAdo35BIN7tFw6raYAgw7DseoRs",
    authDomain: "findteammate-8edfd.firebaseapp.com",
    projectId: "findteammate-8edfd",
    storageBucket: "findteammate-8edfd.appspot.com",
    messagingSenderId: "39507522234",
    appId: "1:39507522234:web:6679741b6aa455edc84883",
    measurementId: "G-ZE0E5XQQYY"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
module.exports = db;
*/

// Firebase Admin SDK 초기화
const admin = require('firebase-admin');
const serviceAccount = require('./findteammate-8edfd-firebase-adminsdk-q17ko-dc6b8251b8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Firestore 인스턴스
module.exports = { admin, db };



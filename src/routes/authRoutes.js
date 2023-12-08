const express = require('express');
const router = express.Router();
const { signUp, login, createProfile, editProfile, getProfile, getProfileByCategory } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/createprofile', createProfile);
router.post('/editprofile', editProfile);
router.get('/getProfile/:uid', getProfile);
router.get('/getProfileByCategory/:category/:value', getProfileByCategory);

module.exports = router;    
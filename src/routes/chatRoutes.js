// /src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { createChatRoom, sendMessage, getChatRoomMessages } = require('../controllers/chatController');

router.post('/createChatRoom', createChatRoom);
router.post('/sendMessage', sendMessage);
router.get('/getChatRoomMessages/:chatRoomId', getChatRoomMessages);

module.exports = router;

// /src/controllers/chatController.js
const { admin, db } = require('../config/firebaseConfig');

const createChatRoom = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    // 채팅 방 생성 및 방 ID 가져오기
    const chatRoomRef = await db.collection('chatRooms').add({
      users: [user1, user2],
      messages: []
    });

    const chatRoomId = chatRoomRef.id;

    res.status(201).json({ chatRoomId });
  } catch (error) {
    console.error(`Error creating chat room: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
    try {
      const { chatRoomId, sender, message } = req.body;
  
      // 메시지 추가
      await db.collection('chatRooms').doc(chatRoomId).update({
        messages: admin.firestore.FieldValue.arrayUnion({
          sender,
          message,
          timestamp: new Date()
        })
      });
  
      res.status(200).json({ message: "메시지 전송 완료" });
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
};

const getChatRoomMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    // 채팅 방의 메시지 가져오기
    const chatRoomSnapshot = await db.collection('chatRooms').doc(chatRoomId).get();

    if (!chatRoomSnapshot.exists) {
      res.status(404).json({ error: "채팅 방을 찾을 수 없습니다." });
      return;
    }

    const chatRoomData = chatRoomSnapshot.data();
    res.status(200).json({ messages: chatRoomData.messages || [] });
  } catch (error) {
    console.error(`Error getting chat room messages: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChatRoom,
  sendMessage,
  getChatRoomMessages
};

// /src/controllers/chatController.js
const { admin, db } = require('../config/firebaseConfig');

const createChatRoom = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    // user1과 user2 중 누가 먼저 나오던지에 관계없이 정렬된 배열 생성
    const sortedUsers = [user1, user2].sort();

    // 정렬된 배열을 이용하여 채팅방 ID 생성
    const chatRoomId = sortedUsers.join('_');

    // 생성된 채팅방 ID로 채팅방을 조회
    const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);
    const chatRoomSnapshot = await chatRoomRef.get();

    if (chatRoomSnapshot.exists) {
      // 채팅방이 이미 존재하면 해당 방의 ID를 반환합니다.
      res.status(200).json({ chatRoomId: chatRoomSnapshot.id });
    } else {
      // 채팅방이 없으면 새로운 채팅방을 생성합니다.
      await chatRoomRef.set({
        users: sortedUsers,
        messages: [],
      });
      res.status(201).json({ chatRoomId });
    }
  } catch (error) {
    console.error(`Error creating or finding chat room: ${error.message}`);
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

    // 메시지의 timestamp를 ISO 문자열로 변환
    const messages = chatRoomData.messages.map(message => {
      return {
        ...message,
        timestamp: message.timestamp.toDate().toISOString() // Timestamp 객체를 Date 객체로 변환 후 ISO 문자열로 변환
      };
    });

    res.status(200).json({ messages: messages });
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

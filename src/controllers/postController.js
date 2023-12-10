const { db } = require('../config/firebaseConfig');


const getAllPosts = async (req, res) => {
  try {
      const postsSnapshot = await db.collection('Post').get();

      if (postsSnapshot.empty) {
          res.status(404).json({ error: '게시물이 없습니다.' });
          return;
      }

      const posts = [];
      postsSnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
      });

      res.status(200).json(posts);
  } catch (error) {
      console.error(`Error getting all posts: ${error.message}`);
      res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
      const postDoc = await db.collection('Post').doc(postId).get();

      if (!postDoc.exists) {
          res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
          return;
      }

      const postData = postDoc.data();

      res.status(200).json(postData);
  } catch (error) {
      console.error(`Error getting post: ${error.message}`);
      res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { uid, title, teamNumber, content,  major,  } = req.body;
      
    const postRef = await db.collection('Post').add({
      uid,
      title,
      teamNumber,
      content,
      major,    
    });
    const postId = postRef.id;
    await postRef.update({ postID: postId });
    res.status(201).json({ postId: postRef.id, message: '게시물이 성공적으로 생성되었습니다.' });
  } catch (error) {
    console.error(`팀 모집 게시물 생성 중 오류 발생: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId, title, teamNumber, content,  major,  } = req.body;
    await db.collection('Post').doc(postId).update({
      title,
      teamNumber,
      content,
      major, 
    });
    res.status(200).json({ message: '게시물이 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.error(`Error editing team recruitment post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await db.collection('Post').doc(postId).delete();
    res.status(200).json({ message: '게시물이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(`팀 모집 게시물 수정 중 오류 발생: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getPostApplications = async (req, res) => {
  const { postId } = req.params;

  try {
      const postDoc = await db.collection('Post').doc(postId).get();

      if (!postDoc.exists) {
          res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
          return;
      }

      const applicationsDoc = await db.collection('applications').where('postid', '==', postId).get();

      if (applicationsDoc.empty) {
          res.status(404).json({ error: "게시물에 대한 지원서가 없습니다." });
          return;
      }

      const applicationsData = applicationsDoc.docs.map(doc => doc.data());

      res.status(200).json(applicationsData);
  } catch (error) {
      console.error(`Error getting applications for post: ${error.message}`);
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
  getPostApplications,
};
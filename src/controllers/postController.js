const { db } = require('../config/firebaseConfig');


const getPost = async (req, res) => {
  try {
    const postsSnapshot  = await db.collection('Post').get();

    if (postsSnapshot .empty) {
      return res.status(404).json({ error: '팀 모집 게시물이 없습니다.' });
    }

    const posts = [];
    postsSnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(`팀 모집 게시물을 가져오는 중 오류 발생: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { uid, title, teamNumber, content, category, hashtags } = req.body;
    if (!Array.isArray(hashtags) || !hashtags.every(tag => typeof tag === 'string')) {
        return res.status(400).json({ error: '해시태그는 문자열의 배열이어야 합니다.' });
      }
      
    const postRef = await db.collection('Post').add({
      uid,
      title,
      teamNumber,
      content,
      category,
      hashtags,
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
    const { postId, title, teamNumber, content, category, hashtags } = req.body;
    await db.collection('Post').doc(postId).update({
      title,
      teamNumber,
      content,
      category,
      hashtags,
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

module.exports = {
  getPost,
  createPost,
  editPost,
  deletePost,
};
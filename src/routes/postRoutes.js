const express = require('express');
const router = express.Router();
const { getAllPosts,getPost,createPost, editPost, deletePost,getPostApplications } = require('../controllers/postController');

router.get('/getAllPosts', getAllPosts); // 모든 게시물 가져오기
router.get('/getPost/:postId', getPost); // 특정 게시물 가져오기
router.post('/create', createPost);
router.post('/edit', editPost);
router.delete('/delete/:postId', deletePost);
router.get('/getPostApplications/:postId', getPostApplications); // 게시물에 대한 지원서 가져오기
module.exports = router;

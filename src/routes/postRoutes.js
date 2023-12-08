const express = require('express');
const router = express.Router();
const { getPost,createPost, editPost, deletePost } = require('../controllers/postController');

router.post('/create', createPost);
router.post('/edit', editPost);
router.delete('/delete/:postId', deletePost);
router.get('/get', getPost);

module.exports = router;

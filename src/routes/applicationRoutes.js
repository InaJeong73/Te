const express = require('express');
const router = express.Router();
const { createApplication, getApplication, getApplicationsByPostId } = require('../controllers/applicationController');

router.post('/createApplication', createApplication);
router.get('/getApplication/:applicantId', getApplication);
router.get('/getApplicationsByPostId:postId', getApplicationsByPostId);

module.exports = router;
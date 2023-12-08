const express = require('express');
const router = express.Router();
const { createApplication, getApplication } = require('../controllers/applicationController');

router.post('/createApplication', createApplication);
router.get('/getApplication/:applicantId', getApplication);

module.exports = router;
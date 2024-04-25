const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'tmp/csv/' });
const { csvUpload, getData } = require('../controllers/index');
const { verifyToken } = require('../middleware/auth');

router.post('/upload', verifyToken, upload.single('file'), csvUpload);
router.get('/data', verifyToken, getData);

module.exports = router;

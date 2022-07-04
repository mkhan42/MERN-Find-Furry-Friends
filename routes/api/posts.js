const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');

router.post('/post', postsCtrl.create);

module.exports = router;
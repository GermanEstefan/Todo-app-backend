const express = require('express');
const { uploadImageAvatar } = require('../controllers/users');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.put('/setAvatar',validateJWT, uploadImageAvatar);

module.exports = router;
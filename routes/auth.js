const express = require('express');
const { createUser, loginUser, verifyToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validationFields');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/create', [
    check('rName', 'Name field is empty').not().isEmpty(),
    check('rPassword', 'The password is requerid').not().isEmpty(),
    check('rPassword', 'The length of password must be higher 6 characters').isLength({ min: 6 }),
    check('rEmail', 'Email field is empty').not().isEmpty(),
    check('rEmail', 'Type a valid email').isEmail(),
    validationFields
], createUser)

router.post('/login', [
    check('lEmail', 'Email field is empty').not().isEmpty(),
    check('lEmail', 'Type a valid email').isEmail(),
    check('lPassword', 'The password is requerid').not().isEmpty(),
    check('lPassword', 'The length of password must be higher 6 characters').isLength({ min: 6 }),
    validationFields
], loginUser)

router.get('/verify', validateJWT, verifyToken)

module.exports = router;

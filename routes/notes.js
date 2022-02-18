const express = require('express');
const { createNote, delteNote, completeNote, noCompletNote } = require('../controllers/notes');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validationFields');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/create', [
    validateJWT,
    check('contentNote', 'Content note is empty').not().isEmpty(),
    validationFields
], createNote);

router.delete('/delete/:id',[
    validateJWT,
    check('id','No es una id valida').isMongoId(),
    validationFields
], delteNote)

router.put('/complete/:id',[
    validateJWT,
    check('id','No es una id valida').isMongoId(),
    validationFields
], completeNote)

router.put('/nocomplete/:id',[
    validateJWT,
    check('id','No es una id valida').isMongoId(),
    validationFields
], noCompletNote)


module.exports = router;

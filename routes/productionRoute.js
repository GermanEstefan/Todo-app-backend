const express = require('express');
const path = require('path');

const router = express.Router();

//This route is used for control react paths in heroku 
router.get('/*', (req, res) => { 
    return res.sendFile(path.join(__dirname,'..','public','index.html'))
})

module.exports = router;
const express = require('express');
const router = express.Router();
const init = require('../init/init.js');
const database = require('../controller/databaseController');


router.post(init.routes.hello, (req, res) => {
    res.send("hello from private")
})

module.exports = router;
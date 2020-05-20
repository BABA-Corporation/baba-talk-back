const middleware = require('../controller/middlewares');
const express = require('express');
const router = express.Router();


const publicRoutes = require('./publicRoutes');
const privateRoutes = require('./privateRoutes');

router.use("/api", publicRoutes);
router.use("/api/private", middleware.tokenExtractor, middleware.tokenVerifyer, privateRoutes);
router.get('/', (req, res) => {
    res.status(200).send('BABA TALK API is working.')
});
module.exports = router;
const express = require('express');

const userRouter = require('./userRouter');

const router = express.Router();

// récupération des stretch
router.get('/',  userRouter);

// on exporte le router 
module.exports = router;
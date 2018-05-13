const express = require('express');
const game = require('./game');
const router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/new', game.create);

module.exports = router;

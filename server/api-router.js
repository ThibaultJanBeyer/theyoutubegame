const express = require('express');

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/new', checkSecretKey, mailController.mailSupport);

var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/userPage', (req, res) => {
  res.render('userPage')
})

module.exports = router;

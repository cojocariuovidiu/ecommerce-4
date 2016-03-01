var router = require('express').Router();


router.get('/', function(req, res){ // http method to retrieve data from server
  res.render('main/home');
});

router.get('/about', function(req, res){ // http method to retrieve data from server
  res.render('main/about');
});

module.exports = router;

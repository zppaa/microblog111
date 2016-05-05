var express = require('express');
var router = express.Router();

router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '用户注册' });
});

module.exports = router;


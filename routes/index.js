var express = require('express');
var router = express.Router();

var crypto = require('crypto'),
  User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  User.get({}, function(err, user) {
    var id = 0;
    if (err) {
      res.send({error: '获取信息失败'});    
    }
    if (user) {

      if(user.length > 0 ){
        id = user[user.length - 1].id;
      }
      res.render('index', {
        title: '海贼王',
        message: "大海绝不会拒绝任何人",
        list: user,
        id: id
      });
    }
  })

});

router.post('/add', function(req, res, next) {

  User.add(req.body, function(err, result) {
    if (err) {
      res.send({error: '添加失败'});    
    }
    if (result) {
   
      res.send({success: true});
    }

  })
  
});

router.post('/delete', function(req, res, next) {

  var id = req.body._id;

  User.delete(id, function(err, result) {
    if (err) {
      res.send({error: '删除失败'});    
    }
    if (result) {
   
      res.send({success: true});
    }

  })
  
});

module.exports = router;

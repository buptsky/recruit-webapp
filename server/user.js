const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const _filter = {userPwd: 0, __v: 0};

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc);
  });
});
// 登录
Router.post('/login', function (req, res) {
  console.log(req.body);
  const {userName, userPwd} = req.body;
  User.findOne({userName, userPwd: md5pwd(userPwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户不存在或密码错误'});
    }
    res.cookie('userId', doc._id);
    return res.json({code: 0, data: doc});
  });
});
// 注册
Router.post('/register', function (req, res) {
  console.log(req.body);
  const {userName, userPwd, userType} = req.body;
  User.findOne({userName}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    }
    const userModel = new User({userName,userType, userPwd: md5pwd(userPwd)});
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务器错误'});
      }
      const {userName, userType, _id} = doc;
      res.cookie('userId', _id);
      return res.json({code: 0, data: {userName, userType, _id}});
    })
    // User.create({}, function (err, doc) {
    // });
  });
});
Router.get('/info', function (req, res) {
  const {userId} = req.cookies;
  if (!userId) { // 没有cookie
    return res.json({code: 1});
  }
  User.findOne({_id: userId}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '服务器错误'});
    }
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  })
});

// 增加密码复杂度
function md5pwd(pwd) {
  const salt = 'buptsky_2016110911';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
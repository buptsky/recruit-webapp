const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = {userPwd: 0, __v: 0};
// 获取用户列表
Router.get('/list', function (req, res) {
  console.log(res);
  const type = req.query.type;
  console.log(type);
  User.find({userType: type}, function (err, doc) {
    return res.json({code: 0, data:doc});
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
    User.create({userName, userType, userPwd: md5pwd(userPwd)}, function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务器错误'});
      }
      const {userName, userType, _id} = doc;
      res.cookie('userId', _id);
      return res.json({code: 0, data: {userName, userType, _id}});
    });
  });
});
// 获取登录状态
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
// 获取信息列表
Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userId;
  User.find({}, function (err, doc) {
    if (err) return console.log(err);
    let users = {};
    doc.forEach((item) => {
      users[item._id] = {name: item.userName, avatar: item.avatar}
    });
    Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users});
      }
    });
  });
});
Router.post('/readmsg', function (req, res) {
  console.log(req.body);
  const userId = req.cookies.userId;
  if (!userId) {
    return res.json({code: 1});
  }
  const {from} = req.body;
  Chat.update({from, to:userId}, {'$set': {read: true}}, {'multi': true}, function (err, doc) {
    console.log(doc);
    if (!err) {
      return res.json({code: 0, num: doc.nModified})
    }
    return res.json({code: 1, msg: '修改失败'});
  });
});
// 完善信息
Router.post('/update', function (req, res) {
  console.log(req.body);
  const userId = req.cookies.userId;
  if (!userId) {
    return res.json({code: 1});
  }
  const body = req.body;
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    const data = {userName: doc.userName, userType: doc.userType, ...body};
    return res.json({code: 0, data});
  });
});

// 增加密码复杂度
function md5pwd(pwd) {
  const salt = 'buptsky_2016110911';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
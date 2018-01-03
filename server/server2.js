const path = require('path')
const models = require('./model');
const Chat = models.getModel('chat');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const app = express();

// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  // console.log('user login');
  socket.on('sendmsg', function (data) {
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      if (!err) {
        io.emit('recvmsg', {...doc._doc});
      }
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/', express.static(path.resolve('build')));
// 静态资源服务器
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  return res.sendFile(path.resolve('build/index.html'));
});

server.listen(9093, function () {
  console.log('app start at port 9093');
});
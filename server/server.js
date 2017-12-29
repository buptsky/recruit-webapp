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
// 静态资源服务器
// app.use('/static', express.static(path.resolve(`${__dirname}`, '../', 'static')));
// app.get('/*', (req, res) => {
//   console.log(req.originalUrl);
//   res.sendFile(path.resolve(`${__dirname}`, '../', 'index.html'));
// });
server.listen(9093, function () {
  console.log('app start at port 9093');
});
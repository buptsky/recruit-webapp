import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
import staticPath from '../build/asset-manifest.json';
assethook({
  extensions: ['png'],
  // name: '[hash].[ext]',
  limit: 10000
});
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {StaticRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import AppRouter from '../src/AppRouter';
import rootReducer from '../src/redux/index'


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
  let context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));
  // const markup = ReactDOMServer.renderToString(
  //   (
  //     <Provider store={store}>
  //       <StaticRouter location={req.url} context={context}>
  //         <AppRouter/>
  //       </StaticRouter>
  //     </Provider>
  //   )
  // );
  res.write(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <meta name="theme-color" content="#000000">
    <title>React App</title>
    <link rel="stylesheet" href="/${staticPath['main.css']}">
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">`)
  const markupStream = ReactDOMServer.renderToNodeStream(
    (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <AppRouter/>
        </StaticRouter>
      </Provider>
    )
  );
  markupStream.pipe(res, {end: false});
  markupStream.on('end', () => {
    res.write(`</div><script src="/${staticPath['main.js']}"></script></body>
</html>`);
    res.end();
  })
//   const pageHtml = `
//   <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//     <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
//     <meta name="theme-color" content="#000000">
//     <title>React App</title>
//     <link rel="stylesheet" href="/${staticPath['main.css']}">
//   </head>
//   <body>
//     <noscript>
//       You need to enable JavaScript to run this app.
//     </noscript>
//     <div id="root">${markup}</div>
//     <script src="/${staticPath['main.js']}"></script>
//   </body>
// </html>`
  // res.send(pageHtml);
  // return res.sendFile(path.resolve('build/index.html'));
});

server.listen(9093, function () {
  console.log('app start at port 9093');
});
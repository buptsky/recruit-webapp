import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://59.110.140.119:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';
const EMPTY_MSG = 'EMPTY_MSG'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(item => !item.read && item.to === action.payload.userId).length
      };
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userId ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + n
      }
    case MSG_READ:
      const {from, num} = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map((item) => {
          if (from === item.from) {
            item.read = true;
          }
          return item
        }),
        unread: state.unread - num
      }
    case EMPTY_MSG:
      return {
        ...initState
      }
    default:
      return {...state};
  }
}

function msgList(msgs, users, userId) {
  return {type: MSG_LIST, payload: {msgs, users, userId}};
}

function msgRecv(msg, userId) {
  return {type: MSG_RECV, payload: {msg, userId}};
}

function msgRead({from, to, num}) {
  return {type: MSG_READ, payload: {from, to, num}};
}

// 发送信息
export function sendMsg({from, to, msg}) {
  return (dispatch, getState) => {
    socket.emit('sendmsg', {from, to, msg});
  }
}

// 接收信息
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      console.log(data);
      const userId = getState().user._id;
      dispatch(msgRecv(data, userId));
    });
  }
}

// 阅读信息
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id;
        dispatch(msgRead({userId, from, num: res.data.num}));
      } else {
        // dispath(errMsg(res.data.msg));
      }
    });
  }
}

// 获取对话消息列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userId));
      } else {
        // dispath(errMsg(res.data.msg));
      }
    });
  }
}

// 清空所有消息
export function emptyMsgs() {
  return {type: EMPTY_MSG};
}
import axios from 'axios';
import io from 'socket.io-client';
const socket =  io('ws://localhost:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
// const MSG_READ = 'MSG_READ';

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
    // case MSG_READ:
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
export function sendMsg({from, to, msg}) {
  return dispath => {
    socket.emit('sendmsg', {from, to, msg});
  }
}

export function recvMsg() {
  return (dispath, getState) => {
    socket.on('recvmsg', function (data) {
      const userId = getState().user._id;
      dispath(msgRecv(data, userId));
    });
  }
}

// 获取对话消息列表
export function getMsgList() {
  return (dispath, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id;
        dispath(msgList(res.data.msgs, res.data.users, userId));
      } else {
        // dispath(errMsg(res.data.msg));
      }
    });
  }
}
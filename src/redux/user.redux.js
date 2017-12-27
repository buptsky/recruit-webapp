import axios from 'axios';
import {getRedirectPath} from '../util';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

// reducer
const initState = {
  redirectTo: '',
  msg: '',
  userName: '',
  userType: ''
}
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
        msg: ''
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        redirectTo: '',
        msg: action.msg
      }
    case LOGOUT:
      return {
        ...initState
      }
    default:
      return {...state};
  }
}

// actions
function errMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data};
}

export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo};
}
// 信息完善
export function update(data) {
  return dispath => {
    axios.post('/user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispath(authSuccess(res.data.data));
      } else {
        dispath(errMsg(res.data.msg));
      }
    });
  }
}
// 登录
export function login({userName, userPwd}) {
  if (!userName || !userPwd) {
    return errMsg('用户名密码必须输入');
  }
  return (dispath) => {
    axios.post('/user/login', {userName, userPwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispath(authSuccess(res.data.data));
      } else {
        dispath(errMsg(res.data.msg));
      }
    });
  }
}
// 注册
export function register({userName, userPwd, repeatPwd, userType}) {
  if (!userName || !userPwd) {
    return errMsg('用户名密码必须输入');
  }
  if (userPwd !== repeatPwd) {
    return errMsg('密码和确认密码不同');
  }
  return (dispath) => {
    axios.post('/user/register', {userName, userPwd, userType}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispath(authSuccess({userName, userPwd, userType}));
      } else {
        dispath(errMsg(res.data.msg));
      }
    });
  }
}
// 注销
export function logoutSubmit() {
  return {type: LOGOUT};
}
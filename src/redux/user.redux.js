import axios from 'axios';
import {getRedirectPath} from '../util';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

// reducer
const initState = {
  redirectTo: '',
  msg: '',
  isAuth: false,
  userName: '',
  userType: ''
}
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        isAuth: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        isAuth: true
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
        isAuth: false,
        msg: action.msg
      }
    default:
      return {...state};
  }
}

// actions
function errMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data};
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data};
}

export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo};
}

export function login({userName, userPwd}) {
  if (!userName || !userPwd) {
    return errMsg('用户名密码必须输入');
  }
  return (dispath) => {
    axios.post('/user/login', {userName, userPwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispath(loginSuccess(res.data.data));
      } else {
        dispath(errMsg(res.data.msg));
      }
    });
  }
}

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
        dispath(registerSuccess({userName, userPwd, userType}));
      } else {
        dispath(errMsg(res.data.msg));
      }
    });
  }
}
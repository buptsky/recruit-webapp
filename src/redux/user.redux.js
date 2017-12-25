import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// reducer
const initState = {
  msg: '',
  isAuth: false,
  userName: '',
  userPwd: '',
  userType: ''
}
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        msg: '',
        isAuth: true
      }
    case ERROR_MSG:
      return {
        ...state,
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
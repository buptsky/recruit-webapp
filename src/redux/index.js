import {combineReducers} from 'redux';
import {user} from './user.redux';
import {chatuser} from './chatuser.redux';

//注册reducer
export default combineReducers({
  user,
  chatuser
});

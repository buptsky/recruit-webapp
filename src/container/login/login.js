import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import {login} from "../../redux/user.redux";

@connect(
  state => ({
    userInfo: state.user
  }),
  {login}
)
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPwd: ''
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.userInfo.msg) {
      Toast.fail(nextprops.userInfo.msg, 1);
      return;
    }
    if (nextprops.userInfo.redirectTo) { // 注册后跳转
      this.props.history.push(nextprops.userInfo.redirectTo);
    }
  }

  register = () => {
    this.props.history.push('/register');
  }

  handleChange = (type, val) => {
    this.setState({
      [type]: val
    });
  }

  handleLogin = () => {
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={(val) => {this.handleChange('userName', val)}}>
              用户
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type="password"
              onChange={(val) => {this.handleChange('userPwd', val)}}
            >
              密码
            </InputItem>
            <WhiteSpace/>
          </List>
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;
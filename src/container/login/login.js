import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends React.Component {

  register = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace/>
            <InputItem>密码</InputItem>
            <WhiteSpace/>
          </List>
          <Button type="primary">登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;
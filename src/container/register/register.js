import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: 'employee'
    }
  }

  changeUserType = (userType) => {
    this.setState({
      userType
    })
  }

  render() {
    const userType = this.state.userType;
    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace/>
            <InputItem>用户名</InputItem>
            <WhiteSpace/>
            <InputItem>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem checked={userType === 'employee'} onChange={() => {
              this.changeUserType('employee');
            }}>
              求职者
            </RadioItem>
            <RadioItem checked={userType === 'boss'} onChange={() => {
              this.changeUserType('boss');
            }}>
              BOSS
            </RadioItem>
            <WhiteSpace/>
            <Button type="primary">注册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
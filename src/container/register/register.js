import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from "../../redux/user.redux";

const RadioItem = Radio.RadioItem;

@connect(
  state => ({
    userInfo: state.user
  }),
  {register}
)
class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPwd: '',
      repeatPwd: '',
      userType: 'employee'
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.userInfo.msg) {
      Toast.fail(nextprops.userInfo.msg, 1);
    }
  }

  handleRegister = () => {
    console.log(this.state);
    this.props.register(this.state);
  }

  handleChange = (type, val) => {
    this.setState({
      [type]: val
    });
  }

  render() {
    const userType = this.state.userType;
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
            <InputItem
              type="password"
              onChange={(val) => {this.handleChange('repeatPwd', val)}}>
              确认密码
            </InputItem>
            <WhiteSpace/>
            <RadioItem checked={userType === 'employee'}
                       onChange={() => {this.handleChange('userType', 'employee')}}
            >
              求职者
            </RadioItem>
            <RadioItem checked={userType === 'boss'}
                       onChange={(val) => {this.handleChange('userType', 'boss')}}
            >
              BOSS
            </RadioItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from "../../redux/user.redux";
import recruitForm from '../../component/recruit-form/recruit-form';

const RadioItem = Radio.RadioItem;

@connect(
  state => ({
    userInfo: state.user
  }),
  {register}
)
@recruitForm
class Register extends React.Component {

  componentDidMount() {
    this.props.handleChange('userType','employee');
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

  handleRegister = () => {
    this.props.register(this.props.state);
  }

  // handleChange = (type, val) => {
  //   this.setState({
  //     [type]: val
  //   });
  // }

  render() {
    const userType = this.props.state.userType;
    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={(val) => {this.props.handleChange('userName', val)}}>
              用户
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type="password"
              onChange={(val) => {this.props.handleChange('userPwd', val)}}
            >
              密码
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type="password"
              onChange={(val) => {this.props.handleChange('repeatPwd', val)}}>
              确认密码
            </InputItem>
            <WhiteSpace/>
            <RadioItem checked={userType === 'employee'}
                       onChange={() => {this.props.handleChange('userType', 'employee')}}
            >
              求职者
            </RadioItem>
            <RadioItem checked={userType === 'boss'}
                       onChange={(val) => {this.props.handleChange('userType', 'boss')}}
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
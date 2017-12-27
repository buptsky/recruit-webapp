import React from 'react';
import { NavBar, InputItem, TextareaItem, Button, WingBlank, Toast } from 'antd-mobile';
import {connect} from 'react-redux';
import {update} from "../../redux/user.redux";
import AvatarSelect from '../../component/avatar-select/avatar-select';

@connect(
  state => ({
    userInfo: state.user
  }),
  {update}
)
class BossInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      desc: '',
      company: '',
      salary: ''
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.userInfo.msg) {
      Toast.fail(nextprops.userInfo.msg, 1);
      return;
    }
    if (nextprops.userInfo.redirectTo) { // 跳转
      this.props.history.push(nextprops.userInfo.redirectTo);
    }
  }

  selectAvatar = (imgName) => {
    this.setState({
      avatar: imgName
    });
  }

  handleChange = (type, val) => {
    this.setState({
      [type]: val
    });
  }

  render() {
    return (
      <div>
        <NavBar mode="dark" className="fixd-header">BOSS信息完善</NavBar>
        <AvatarSelect selectAvatar={this.selectAvatar}/>
        <InputItem onChange={(val) => this.handleChange('title', val)}>招聘职位</InputItem>
        <InputItem onChange={(val) => this.handleChange('company', val)}>公司名称</InputItem>
        <InputItem onChange={(val) => this.handleChange('salary', val)}>职位薪资</InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          autoHeight
          onChange={(val) => this.handleChange('desc', val)}
        />
        <WingBlank>
          <Button type="primary" onClick={() => {this.props.update(this.state)}}>保存信息</Button>
        </WingBlank>
      </div>
    );
  }
}

export default BossInfo;
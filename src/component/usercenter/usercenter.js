import React from 'react';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {connect} from 'react-redux';
import {logoutSubmit} from '../../redux/user.redux';

const Item = List.Item;
const Brief = Item.Brief;
const confirmAlert = Modal.alert;

@connect(
  state => ({
    userinfo: state.user
  }),
  {logoutSubmit}
)
class Usercenter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  logout = () => {
    confirmAlert('退出登录', '确认退出？', [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {
        browserCookie.erase('userId');
        this.props.logoutSubmit();
        this.props.history.push('/login');
      }},
    ]);
  }

  render() {
    console.log(this.props.userinfo);
    const userinfo = this.props.userinfo;
    return (
      <div className="page-content">
        {
          this.props.userinfo.userName && (
            <div>
              <Result
                img={<img src={require(`../../asset/avatar-imgs/${userinfo.avatar}.png`)} style={{width: 50}} alt=""/>}
                title={userinfo.userName}
                message={userinfo.userType === 'boss' ? userinfo.company : ''}
              />
              <List renderHeader={() => '个人简介'}>
                <Item multipleLine extra={userinfo.salary}>
                  {userinfo.title}
                  {
                    userinfo.desc.split('\n').map((item, index) => {
                      return ( <Brief key={index}>{item}</Brief>)
                    })
                  }
                </Item>
              </List>
              <WhiteSpace/>
              <List>
                <Item onClick={this.logout}>退出登录</Item>
              </List>
            </div>
          )
        }

      </div>
    );
  }
}

export default Usercenter;
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getMsgList, recvMsg} from '../../redux/chat.redux';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import Boss from '../boss/boss';
import Employee from '../employee/employee';
import Msg from '../msg/msg';
import Usercenter from '../usercenter/usercenter';
import NavLinkBar from '../navlink/navlink';
import QueueAnim from 'rc-queue-anim';

@connect(
  state => ({
    userInfo: state.user,
    chat: state.chat
  }),
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {

  componentDidMount() {
    if (!Object.keys(this.props.chat.users).length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  render() {
    const {pathname} = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: '求职者',
        icon: 'boss',
        title: '求职者列表',
        component: Boss,
        hide: this.props.userInfo.userType === 'employee'
      },
      {
        path: '/employee',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Employee,
        hide: this.props.userInfo.userType === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Usercenter
      }
    ];
    const page = navList.find(item => item.path === pathname);
    if (!page) return (<Redirect to={"/msg"}/>);
    return (
      <div>
        <NavBar
          mode='dark'
          className="fixd-header"
        >
          {page.title}
        </NavBar>
        <div className="page-content">
          <QueueAnim type={'scaleX'}>
            <Route
              key={page.path}
              path={page.path}
              component={page.component}
            />
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    );
  }
}

export default Dashboard;
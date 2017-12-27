import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import Boss from '../boss/boss';
import Employee from '../employee/employee';
import Msg from '../msg/msg';
import Usercenter from '../usercenter/usercenter';
import NavLinkBar from '../navlink/navlink';

@connect(
  state => ({
    userInfo: state.user
  })
)
class Dashboard extends React.Component {

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
    return (
      <div>
        <NavBar mode='dark' className="fixd-header">{navList.find((item) => item.path === pathname).title}</NavBar>
        <div className="page-content">
          <Switch>
            {
              navList.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                );
              })
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    );
  }
}

export default Dashboard;
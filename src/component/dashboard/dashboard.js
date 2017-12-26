import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import NavLinkBar from '../navlink/navlink';

@connect(
  state => ({
    userInfo: state.user
  })
)
class Dashboard extends React.Component {


  render() {
    const {pathname} = this.props.location;
    console.log(this.props.userInfo);
    const navList = [
      {
        path: '/boss',
        text: '求职者',
        icon: 'boss',
        title: '求职者列表',
        component: '',
        hide: this.props.userInfo.userType === 'employee'
      },
      {
        path: '/employee',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: '',
        hide: this.props.userInfo.userType === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: ''
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: ''
      }
    ];
    return (
      <div>
        <NavBar mode='dark'>{navList.find((item) => item.path === pathname).title}</NavBar>
        <div style={{height: 1000, backgroundColor: '#ccc'}}></div>
        <NavLinkBar data={navList}/>
      </div>
    );
  }
}

export default Dashboard;
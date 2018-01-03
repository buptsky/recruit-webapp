import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import EmployeeInfo from './container/employeeinfo/employeeinfo';
import Login from './container/login/login';
import Register from './container/register/register';
import Chat from './component/chat/chat';
import Dashboard from './component/dashboard/dashboard';

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <AuthRoute/>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/employeeinfo' component={EmployeeInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/chat/:user' component={Chat}/>
          <Route component={Dashboard}/>
        </Switch>
      </div>
    )
  }
}

export default AppRouter;


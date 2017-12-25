import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import AuthRoute from './component/authroute/authroute';
import Login from './container/login/login';
import Register from './container/register/register';


const AppRouter = (
  <BrowserRouter>
    <div>
      <AuthRoute/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </div>
  </BrowserRouter>
);
export default AppRouter;


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 基础样式
import './config'; // 全局拦截
import AppRouter from './AppRouter';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index'

// redux 状态调试
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    {AppRouter}
  </Provider>, document.getElementById('root')
);


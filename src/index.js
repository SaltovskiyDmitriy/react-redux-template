import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/stores';
import Root from './Root';
import NotificationsShell from './utils/notifications';
import './assets/scss/main.scss';

ReactDOM.render(
  <Provider key={ module.hot ? Date.now() : store } store={ store }>
    <NotificationsShell>
      <Root />
    </NotificationsShell>
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import { push } from 'connected-react-router';

const target = document.querySelector('#root');
if (!localStorage.getItem('user-token')) {
  store.dispatch(push('/'));
} else {
  store.dispatch(push('/main'));
}

const startApp = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>,
    target
  );
  registerServiceWorker();
};

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

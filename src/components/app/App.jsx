import React from 'react';
import { Route } from 'react-router-dom';
import './../../assets/styles/style.css';
import axios from 'axios';

import Home from '../home/Home';
import Main from '../main/Main';
import Account from '../account/Account';
import InfoPages from '../info-pages/InfoPages';
import CreateTicket from '../create-ticket/CreateTicket';
import Wallet from '../wallet/Wallet';
import Notifications from '../notifications/Notifications';

class App extends React.Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['api-key'] = 'zTqtA8gLpRE7TRnd';
    if (localStorage.getItem('user-token')) {
      const userToken = localStorage.getItem('user-token');
      axios.defaults.headers.common['user-token'] = userToken;
    }

    /* #HERE# */

    if (window.cordova) {
      this.checkAndroidPermissions(() => {
        alert("That's all");
      })
    } else {
      alert("Ты чо делаешь?!");
    }
  }

  /* #HERE# */
  checkAndroidPermissions(callback) {
    if (window.device.platform !== "Android") {
      callback();
      return;
    }

    var permissions = window.cordova.plugins.permissions;

    var arr = [
      permissions.CAMERA,
      permissions.RECORD_AUDIO,
      permissions.MODIFY_AUDIO_SETTINGS
    ];

    permissions.hasPermission(
      arr,
      function(status) {
        if (status.hasPermission) {
          callback();
          return;
        }

        permissions.requestPermissions(
          arr,
          function(status) {
            if (status.hasPermission) {
              callback();
              return;
            }
            alert("Please manually enable camera and microphone permissions.");
          },
          function() {
            alert("Please manually enable camera and microphone permissions.");
          }
        );
      },
      function() {
        alert("Please manually enable camera and microphone permissions.");
      }
    );
  }

  render() {
    return (
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/main" component={Main} />
        <Route path="/account" component={Account} />
        <Route path="/info-pages" component={InfoPages} />
        <Route path="/create-ticket" component={CreateTicket} />
        <Route path="/wallet" component={Wallet} />
        <Notifications />
      </main>
    );
  }
}

export default App;

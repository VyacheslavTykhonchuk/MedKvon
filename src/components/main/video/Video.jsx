/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'axios';
import { showNotification } from '../../../actions/notificationActions';
import { push } from 'connected-react-router';

// import { WebRtcPeer } from 'kurento-utils';
// import 'webrtc-adapter';
import '../../../utility/adapter';
import kurentoUtils from '../../../utility/kurento-utils.js';

const mapDispatchToProps = {
  showNotification,
  push,
};

const mapStateToProps = (state) => ({
  videoURL: state.videoCall.url,
  userType: state.user.userType,
});

const VIDEO_CALL = (VIDEO_DATA) => {
  let $order_id_g = VIDEO_DATA.$order_id_g,
    $room_id_g = VIDEO_DATA.$room_id_g,
    $video_doctor = VIDEO_DATA.$video_doctor,
    $video_translater = VIDEO_DATA.$video_translater,
    $video_user = VIDEO_DATA.$video_user,
    $video_user2 = VIDEO_DATA.$video_user2;

  var ws = new WebSocket('wss://' + 'videodoctor.pp.ua' + ':8443/one2one');
  var videoInput = [];
  var videoOutput = [];
  var webRtcPeer = [];
  var refreshCall = null;
  var finduserStatus = [];
  var intervals = {};
  var initcam = false;
  const NO_CALL = 0;
  var callState = null;

  videoInput[$video_user] = document.getElementById('videome');
  videoOutput[$video_doctor] = document.getElementById('videodoctor');
  videoOutput[$video_translater] = document.getElementById('videotranslater');

  document.getElementById('terminate').addEventListener('click', function() {
    stop();
  });

  document.getElementById('startcall').addEventListener('click', function(el) {
    register($video_user);
    register($video_user2);
  });

  ws.onopen = function() {
    register($video_user);
    register($video_user2);
  };

  // проверка входящих каждых несколько секунд
  function checkCall(message) {
    console.log('message', message);
    if (message.name == $video_user) {
      intervals[$video_doctor] = setInterval(function() {
        call(message.name, $video_doctor);
      }, 5000);
    }
    if (message.name == $video_user2) {
      intervals[$video_translater] = setInterval(function() {
        call(message.name, $video_translater);
      }, 5000);
    }
  }

  // отключаем конект при закрытии страницы
  window.onbeforeunload = function() {
    ws.close();
  };

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
      case 'registerResponse':
        resgisterResponse(parsedMessage);
        break;
      case 'finduser':
        finduser(parsedMessage);
        break;
      case 'callResponse':
        callResponse(parsedMessage);
        break;
      case 'incomingCall':
        incomingCall(parsedMessage);
        break;
      case 'startCommunication':
        startCommunication(parsedMessage);
        break;
      case 'stopCommunication':
        console.info('Communication ended by remote peer');
        if (parsedMessage.name) {
          stop(parsedMessage.name);
        } else {
          stop();
        }
        // checkCall();
        // stop(true);
        break;
      case 'iceCandidate':
        // alert(parsedMessage.from);
        webRtcPeer[parsedMessage.from].addIceCandidate(parsedMessage.candidate);
        break;
      default:
        console.error('Unrecognized message', parsedMessage);
    }
  };
  function resgisterResponse(message) {
    if (message.response == 'accepted') {
      checkCall(message);

      if (message.name == $video_user) {
        initcamfunc();
      }
    } else {
      var errorMessage = message.message
        ? message.message
        : 'Unknown reason for register rejection.';
      // console.log(errorMessage);
    }
  }

  function callResponse(message) {
    if (message.response != 'accepted') {
      console.info('Call not accepted by peer. Closing call');
      var errorMessage = message.message
        ? message.message
        : 'Unknown reason for call rejection.';
      console.log(errorMessage);
      // stop(true);
    } else {
      clearInterval(intervals[message.to]);
      webRtcPeer[message.from].processAnswer(message.sdpAnswer);
    }
  }

  function finduser(message) {
    if (message.status) {
      finduserStatus[message.to] = true;
      return finduserStatus[message.to];
    } else {
      finduserStatus[message.to] = false;
      return finduserStatus[message.to];
    }
  }

  function startCommunication(message) {
    webRtcPeer[message.from].processAnswer(message.sdpAnswer);
  }
  /*
       function incomingCall(message) {
       webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
       function (error) {
       if (error) {
       // console.error(error);
       }
      
       this.generateOffer(function (error, offerSdp) {
       if (error) {
       // console.error(error);
       }
       var response = {
       id: 'incomingCallResponse',
       from: message.from,
       callResponse: 'accept',
       sdpOffer: offerSdp
       };
       sendMessage(response);
       });
       });
       }*/

  function register(name_user) {
    document.getElementById('terminate').classList.remove('videoroom_hidden');
    document.getElementById('startcall').classList.add('videoroom_hidden');
    document
      .getElementById('my_video_block')
      .classList.remove('videoroom_hidden');
    if (name_user == '') {
      window.alert('You must insert your user name');
      return;
    }
    var message = {
      id: 'register',
      name: name_user,
    };

    sendMessage(message);
  }

  function call(from, to) {
    var message = {
      id: 'finduser',
      from: from,
      to: to,
    };
    sendMessage(message);

    if (finduserStatus[to]) {
      let options;
      if (to == $video_translater) {
        document
          .getElementById('translator_video_block')
          .classList.remove('videoroom_hidden');
        options = {
          localVideo: videoInput[from],
          remoteVideo: videoOutput[to],
          onicecandidate: onIceCandidate2,
        };
      } else {
        options = {
          localVideo: videoInput[from],
          remoteVideo: videoOutput[to],
          onicecandidate: onIceCandidate,
        };
      }
      console.log('options', options);
      webRtcPeer[from] = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
        options,
        function(error) {
          if (error) {
            // console.error(error);
          }

          this.generateOffer(function(error, offerSdp) {
            // console.log(offerSdp);
            if (error) {
              // console.error(error);
            }
            var message = {
              id: 'call',
              from: from,
              to: to,
              sdpOffer: offerSdp,
            };
            sendMessage(message);
          });
        }
      );
      clearInterval(intervals[message.to]);
    }

    /*else {
             if(initcam==false) {
             var options = {
             localVideo: videoInput,
             onicecandidate: onIceCandidate
             }
             webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
             if (error) {
             // console.error(error);
             }
        
             this.generateOffer(function (error, offerSdp) {
             if (error) {
             // console.error(error);
             }
             var message = {
             id: 'call',
             from: $video_user,
             sdpOffer: offerSdp
             };
             sendMessage(message);
             });
             });
             initcam =true;
             }
             }*/
  }

  function stop(name) {
    if (name) {
      if (name == $video_user2) {
        document
          .getElementById('translator_video_block')
          .classList.add('videoroom_hidden');
      }

      if (webRtcPeer[name]) {
        webRtcPeer[name].dispose();
        webRtcPeer[name] = null;
      }

      if (name == $video_user) {
        clearInterval(intervals[$video_doctor]);
        finduserStatus[$video_doctor] = null;
        checkCall({ name: name });
        if (webRtcPeer[$video_doctor]) {
          webRtcPeer[$video_doctor].dispose();
          webRtcPeer[$video_doctor] = null;
        }
      }
      if (name == $video_user2) {
        clearInterval(intervals[$video_translater]);
        finduserStatus[$video_translater] = null;
        checkCall({ name: name });
        if (webRtcPeer[$video_translater]) {
          webRtcPeer[$video_translater].dispose();
          webRtcPeer[$video_translater] = null;
        }
      }
      initcam = false;
      initcamfunc();
    } else {
      // alert();
      document.getElementById('startcall').classList.remove('videoroom_hidden');
      document.getElementById('terminate').classList.add('videoroom_hidden');
      document
        .getElementById('my_video_block')
        .classList.add('videoroom_hidden');
      document
        .getElementById('translator_video_block')
        .classList.add('videoroom_hidden');

      for (let key in webRtcPeer) {
        if (webRtcPeer[key]) {
          webRtcPeer[key].dispose();
          webRtcPeer[key] = null;
        }
      }
      webRtcPeer = [];

      if (!message) {
        var message = {
          id: 'stop',
        };
        sendMessage(message);
      }
      for (let key in intervals) {
        clearInterval(intervals[key]);
      }
      for (let key in finduserStatus) {
        finduserStatus[key] = null;
      }
      initcam = false;
      // initcamfunc();
    }
  }

  function initcamfunc() {
    if (initcam == false) {
      var options = {
        localVideo: videoInput[$video_user],
        onicecandidate: onIceCandidate,
      };
      webRtcPeer['local'] = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
        options,
        function(error) {
          this.generateOffer(function(error, offerSdp) {
            if (error) {
              // console.error(error);
            }
            var message = {
              id: 'call',
              from: $video_user,
              sdpOffer: offerSdp,
            };
            sendMessage(message);
          });
        }
      );
      initcam = true;
    }
  }

  function onIceCandidate(candidate) {
    // console.log(candidate);
    // return;
    // console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidate',
      candidate: candidate,
      from: $video_user,
    };
    sendMessage(message);
  }

  function onIceCandidate2(candidate) {
    // console.log(candidate);
    // return;
    // console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidate',
      candidate: candidate,
      from: $video_user2,
    };
    sendMessage(message);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Senging message: ' + jsonMessage);
    ws.send(jsonMessage);
  }
};
const VIDEO_CALL_DOCTOR = (VIDEO_DATA) => {
  const $video_user = VIDEO_DATA.$video_user;
  const $video_doctor = VIDEO_DATA.$video_doctor;
  const $video_doctor2 = VIDEO_DATA.$video_doctor2;
  const $video_translater = VIDEO_DATA.$video_translater;
  const $order_id_g = VIDEO_DATA.$order_id_g;

  var ws = new WebSocket('wss://' + 'videodoctor.pp.ua' + ':8443/one2one');
  var videoInput = [];
  var videoOutput = [];
  var webRtcPeer = [];
  var refreshCall = null;
  var finduserStatus = [];
  var intervals = {};
  var initcam = false;

  videoInput[$video_doctor] = document.getElementById('videome');
  videoOutput[$video_user] = document.getElementById('videouser');
  videoOutput[$video_translater] = document.getElementById('videotranslater');

  const NO_CALL = 0;
  var callState = null;

  videoInput[$video_doctor] = document.getElementById('videome');
  videoOutput[$video_user] = document.getElementById('videouser');
  videoOutput[$video_translater] = document.getElementById('videotranslater');

  document.getElementById('terminate').addEventListener('click', function() {
    stop();
  });
  document.getElementById('startcall').addEventListener('click', function(el) {
    register($video_doctor);
    register($video_doctor2);
  });

  ws.onopen = function() {
    register($video_doctor);
    register($video_doctor2);
  };

  // проверка входящих каждых несколько секунд
  function checkCall(message) {
    if (message.name == $video_doctor2) {
      intervals[$video_translater] = setInterval(function() {
        call(message.name, $video_translater);
      }, 5000);
    }
  }

  window.onbeforeunload = function() {
    ws.close();
  };

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
      case 'registerResponse':
        resgisterResponse(parsedMessage);
        break;
      case 'finduser':
        finduser(parsedMessage);
        break;
      case 'callResponse':
        callResponse(parsedMessage);
        break;
      case 'incomingCall':
        incomingCall(parsedMessage);
        break;
      case 'startCommunication':
        startCommunication(parsedMessage);
        break;
      case 'stopCommunication':
        console.info('Communication ended by remote peer');
        if (parsedMessage.name) {
          stop(parsedMessage.name);
        } else {
          stop();
        }
        // checkCall();
        // stop(true);
        break;
      case 'iceCandidate':
        // alert(parsedMessage.from);
        webRtcPeer[parsedMessage.from].addIceCandidate(parsedMessage.candidate);
        break;
      default:
        console.error('Unrecognized message', parsedMessage);
    }
  };

  function resgisterResponse(message) {
    if (message.response == 'accepted') {
      checkCall(message);

      if (message.name == $video_doctor) {
        initcamfunc();
      }
    } else {
      var errorMessage = message.message
        ? message.message
        : 'Unknown reason for register rejection.';
      console.log(errorMessage);
      alert('Error registering user or chat room opened in another window');
    }
  }

  function callResponse(message) {
    if (message.response != 'accepted') {
      console.info('Call not accepted by peer. Closing call');
      var errorMessage = message.message
        ? message.message
        : 'Unknown reason for call rejection.';
      console.log(errorMessage);
      // stop(true);
    } else {
      clearInterval(intervals[message.to]);
      webRtcPeer[message.from].processAnswer(message.sdpAnswer);
    }
  }

  function finduser(message) {
    if (message.status) {
      finduserStatus[message.to] = true;
      return finduserStatus[message.to];
    } else {
      finduserStatus[message.to] = false;
      return finduserStatus[message.to];
    }
  }

  function startCommunication(message) {
    webRtcPeer[message.from].processAnswer(message.sdpAnswer);
  }

  function incomingCall(message) {
    // alert(JSON.stringify(message));

    if (message.from == $video_translater) {
      var options = {
        localVideo: videoInput[message.to],
        remoteVideo: videoOutput[message.from],
        onicecandidate: onIceCandidate2,
      };
    } else {
      var options = {
        localVideo: videoInput[message.to],
        remoteVideo: videoOutput[message.from],
        onicecandidate: onIceCandidate,
      };
    }

    webRtcPeer[message.from] = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
      options,
      function(error) {
        if (error) {
          // console.error(error);
        }

        this.generateOffer(function(error, offerSdp) {
          if (error) {
            // console.error(error);
          }
          var response = {
            id: 'incomingCallResponse',
            from: message.from,
            to: message.to,
            callResponse: 'accept',
            sdpOffer: offerSdp,
          };
          sendMessage(response);
        });
      }
    );
  }

  function register(name_user) {
    document.getElementById('terminate').classList.remove('videoroom_hidden');
    document.getElementById('startcall').classList.add('videoroom_hidden');
    document
      .getElementById('my_video_block')
      .classList.remove('videoroom_hidden');
    var name = name_user;
    if (name == '') {
      window.alert('You must insert your user name');
      return;
    }
    var message = {
      id: 'register',
      name: name,
    };
    sendMessage(message);
  }

  function stop(name) {
    if (name) {
      if (name == $video_doctor2) {
        document
          .getElementById('translator_video_block')
          .classList.add('videoroom_hidden');
      }

      if (webRtcPeer[name]) {
        webRtcPeer[name].dispose();
        webRtcPeer[name] = null;
      }

      if (name == $video_doctor) {
        if (webRtcPeer[$video_user]) {
          webRtcPeer[$video_user].dispose();
          webRtcPeer[$video_user] = null;
        }
      }
      if (name == $video_doctor2) {
        if (webRtcPeer[$video_doctor2]) {
          webRtcPeer[$video_doctor2].dispose();
          webRtcPeer[$video_doctor2] = null;
        }
        clearInterval(intervals[$video_translater]);
        finduserStatus[$video_translater] = null;
        checkCall({ name: name });
      }
      initcam = false;
      initcamfunc();
    } else {
      document.getElementById('startcall').classList.remove('videoroom_hidden');
      document.getElementById('terminate').classList.add('videoroom_hidden');
      document
        .getElementById('my_video_block')
        .classList.add('videoroom_hidden');
      document
        .getElementById('translator_video_block')
        .classList.add('videoroom_hidden');

      console.log(webRtcPeer);

      for (let key in webRtcPeer) {
        if (webRtcPeer[key]) {
          webRtcPeer[key].dispose();
          webRtcPeer[key] = null;
        }
      }

      if (!message) {
        var message = {
          id: 'stop',
        };
        sendMessage(message);
      }
      for (let key in intervals) {
        clearInterval(intervals[key]);
      }
      for (let key in finduserStatus) {
        finduserStatus[key] = null;
      }
      initcam = false;
      initcamfunc();
    }
  }

  function initcamfunc() {
    if (initcam == false) {
      var options = {
        localVideo: videoInput[$video_doctor],
        onicecandidate: onIceCandidate,
      };
      webRtcPeer['local'] = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
        options,
        function(error) {
          this.generateOffer(function(error, offerSdp) {
            if (error) {
              // console.error(error);
            }
            var message = {
              id: 'call',
              from: $video_doctor,
              sdpOffer: offerSdp,
            };
            sendMessage(message);
          });
        }
      );
      initcam = true;
    }
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Senging message: ' + jsonMessage);
    ws.send(jsonMessage);
  }

  function onIceCandidate(candidate) {
    // console.log(candidate);
    // return;
    // console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidate',
      candidate: candidate,
      from: $video_doctor,
    };
    sendMessage(message);
  }

  function onIceCandidate2(candidate) {
    // console.log(candidate);
    // return;
    // console.log('Local candidate' + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidate',
      candidate: candidate,
      from: $video_doctor2,
    };
    sendMessage(message);
  }

  function call(from, to) {
    var message = {
      id: 'finduser',
      from: from,
      to: to,
    };
    sendMessage(message);

    if (finduserStatus[to]) {
      if (to == $video_translater) {
        document
          .getElementById('translator_video_block')
          .classList.remove('videoroom_hidden');
        var options = {
          localVideo: videoInput[from],
          remoteVideo: videoOutput[to],
          onicecandidate: onIceCandidate2,
        };
      } else {
        var options = {
          localVideo: videoInput[from],
          remoteVideo: videoOutput[to],
          onicecandidate: onIceCandidate,
        };
      }
      webRtcPeer[from] = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
        options,
        function(error) {
          if (error) {
            // console.error(error);
          }

          this.generateOffer(function(error, offerSdp) {
            // console.log(offerSdp);
            if (error) {
              // console.error(error);
            }
            var message = {
              id: 'call',
              from: from,
              to: to,
              sdpOffer: offerSdp,
            };
            sendMessage(message);
          });
        }
      );
      clearInterval(intervals[message.to]);
    }
  }
};

class Video extends Component {
  constructor(props) {
    super(props);

    /* #HERE# */
    if (window.cordova) {
      this.checkAndroidPermissions(() => {});
    } else {
      // alert("Ты чо делаешь?!");
    }
  }

  componentDidMount() {
    get(`https://videodoctor.pp.ua${this.props.videoURL}`)
      .then((result) => {
        const { ...VIDEO_DATA } = result.data.connect_info;
        if (this.props.userType == 10) {
          VIDEO_CALL(VIDEO_DATA);
        } else {
          VIDEO_CALL_DOCTOR(VIDEO_DATA);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* #HERE# */
  checkAndroidPermissions(callback) {
    if (window.device.platform !== 'Android') {
      callback();
      return;
    }

    var permissions = window.cordova.plugins.permissions;

    var arr = [
      permissions.CAMERA,
      permissions.RECORD_AUDIO,
      permissions.MODIFY_AUDIO_SETTINGS,
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
            alert('Please manually enable camera and microphone permissions.');
          },
          function() {
            alert('Please manually enable camera and microphone permissions.');
          }
        );
      },
      function() {
        alert('Please manually enable camera and microphone permissions.');
      }
    );
  }
  call = () => {
    console.log(`click`);
  };
  hang = () => {
    this.props.push('/main/active-tickets/conference');
  };
  render() {
    return (
      <div id="VideoComponent" className="my_video_block">
        {/* <div id="debug">TEST TEXT</div> */}
        <div
          id="translator_video_block"
          className="skype-main__video_translator videoroom_hidden"
        >
          <video
            id="videotranslater"
            playsInline
            autoPlay
            width="100%"
            height="100%"
            poster="/design/img/video-camera-outline.svg"
          />
        </div>
        <video
          id={this.props.userType === 10 ? 'videodoctor' : 'videouser'}
          autoPlay
          playsInline
          width="100%"
          height="100%"
        />
        <div
          id="my_video_block"
          className="skype-main__video_i videoroom_hidden"
        >
          <video
            id="videome"
            playsInline
            autoPlay
            width="100%"
            height="100%"
            poster="<?= Yii::$app->user->identity->avatar ?>"
          />
          <video
            id="videome2"
            playsInline
            autoPlay
            width="10px"
            height="10px"
          />
          <div id="terminate" onClick={this.hang}>
            <svg
              width="41"
              height="18"
              viewBox="0 0 41 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="app" fill="none" fillRule="evenodd">
                <g
                  id="Сonference2"
                  transform="translate(-82 -667)"
                  fill="#FFF"
                  fillRule="nonzero"
                >
                  <path
                    d="M115.166605,684.507595 C115.184878,683.754884 114.661129,683.137815 113.961717,683.039259 C112.496126,682.846299 111.057106,682.488448 109.668911,681.971339 C109.151359,681.777131 108.567912,681.901346 108.180384,682.283863 L106.381743,684.079369 C105.930932,684.529395 105.234469,684.623253 104.680256,684.308668 C100.913,682.170279 97.7937689,679.056482 95.6516482,675.295789 C95.3365138,674.742542 95.4305354,674.047292 95.8813469,673.597266 L97.6743994,671.807369 C98.0631713,671.414907 98.1876032,670.832476 97.9918595,670.312636 C97.4750444,668.93005 97.1165696,667.493536 96.9250518,666.043496 C96.8255607,665.340822 96.2196619,664.820657 95.4948613,664.82771 L91.2474383,664.827709 C90.8498923,664.828083 90.4708078,664.995235 90.2027865,665.288335 C89.9347652,665.581435 89.802488,665.973492 89.8360963,666.346681 C90.2774808,670.495864 91.6917365,674.482911 93.9709934,677.995248 C96.0339078,681.236018 98.7863106,683.983626 102.043755,686.050007 C105.535909,688.310711 109.510585,689.722182 113.622901,690.168473 C114.020064,690.204304 114.413955,690.071326 114.707806,689.802207 C115.001657,689.533089 115.168235,689.152771 115.166605,688.74895 L115.166605,684.507595 Z M104.37886,682.079976 L106.080348,681.850677 C105.769115,681.674013 105.462894,681.489805 105.161925,681.298289 L104.37886,682.079976 Z M117.999097,688.743211 C118.003953,689.93746 117.504219,691.078413 116.622666,691.885769 C115.741112,692.693124 114.55944,693.092059 113.34244,692.982032 C108.764182,692.485433 104.366443,690.923726 100.513604,688.429454 C96.9162126,686.147504 93.8662527,683.102858 91.587025,679.522165 C89.0725829,675.647518 87.5077944,671.236091 87.017258,666.623217 C86.90992,665.437488 87.3067513,664.261318 88.1108153,663.382019 C88.9148793,662.502719 90.0521327,662.001262 91.2461046,662.00014 L95.480923,662.000208 C97.6135101,661.979256 99.4312063,663.539751 99.7314586,665.660772 C99.8968222,666.912388 100.203494,668.141313 100.644428,669.320915 C101.22807,670.870865 100.854774,672.618157 99.6828703,673.801153 L98.6672864,674.814968 C100.332595,677.422904 102.549436,679.635883 105.161925,681.298289 L106.18312,680.278891 C107.362561,679.114607 109.112903,678.741962 110.662363,679.323391 C111.847218,679.764752 113.078288,680.07089 114.344743,680.237689 C116.474563,680.537631 118.042803,682.378701 117.999109,684.523397 L117.999097,688.743211 Z"
                    id="Shape"
                    transform="rotate(135 102.5 677.5)"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div id="startcall" onClick={this.call}>
            startcall
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);

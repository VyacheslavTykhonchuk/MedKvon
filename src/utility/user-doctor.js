import { WebRtcPeer } from 'kurento-utils';
import 'webrtc-adapter';
import './index.js';

let $order_id_g = 60,
  $room_id_g = 22,
  $video_doctor = '41_qHdBlYUB',
  $video_translater = 'XPvyFL9sTj',
  $video_user = '83_sq9DyelNoN',
  $video_user2 = '83_sq9DyelNoN_translater';
var ws = new WebSocket('wss://' + 'kvonda.com' + ':8443/one2one');
console.log(WebRtcPeer);
var videoInput = [];
var videoOutput = [];
var webRtcPeer = [];
var refreshCall = null;
var finduserStatus = [];
var intervals = {};
var initcam = false;

console.log(webRtcPeer);

const NO_CALL = 0;
var callState = null;

window.onload = function() {
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
};

ws.onopen = function() {
  // register();
};

// проверка входящих каждых несколько секунд
function checkCall(message) {
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
    // case 'incomingCall':
    //   incomingCall(parsedMessage);
    //   break;
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
    webRtcPeer[from] = WebRtcPeer.WebRtcPeerSendrecv(options, function(error) {
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
    });
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
    document.getElementById('my_video_block').classList.add('videoroom_hidden');
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
    webRtcPeer['local'] = WebRtcPeer.WebRtcPeerSendrecv(options, function(
      error
    ) {
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
    });
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

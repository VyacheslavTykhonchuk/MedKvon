import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showNotification } from '../../../actions/notificationActions';
import { push } from 'connected-react-router';

// import '../../../utility/adapter.js';
// import '../../../utility/index.js';
// import '../../../utility/kurento-utils.js';
// import '../../../utility/user-doctor.js';

import Preloader from '../../preloader/Preloader';

const mapDispatchToProps = {
  showNotification,
  push,
};
const mapStateToProps = (state) => ({
  videoURL: state.videoCall.url,
});

class Video extends Component {
  render() {
    return (
      <div className="VideoComponent">
        VIDEO
        <video
          id="videodoctor"
          autoplay
          playsinline
          width="100%"
          height="100%"
        />
        <div id="my_video_block" class="skype-main__video_i videoroom_hidden">
          <video
            id="videome"
            playsinline
            autoplay
            width="100%"
            height="100%"
            poster="<?= Yii::$app->user->identity->avatar ?>"
          />
          <video
            id="videome2"
            playsinline
            autoplay
            width="10px"
            height="10px"
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);

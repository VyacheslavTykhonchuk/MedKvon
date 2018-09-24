import React from 'react';
import axios, { get } from 'axios';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Card from '../../card/Card';
import Preloader from '../../preloader/Preloader';
import { setVideoData } from '../../../modules/videoModule';

const mapStateToProps = (state) => ({
  userType: state.user.userType,
});

class ActiveTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTickets: [], loading: true };

    axios.get(`https://videodoctor.pp.ua/api_v1/activetickets`).then((res) => {
      const activeTickets = res.data;
      this.setState({ activeTickets: activeTickets.data, loading: false });
    });
  }
  leftBtnFunc = (videoURL) => {
    this.props.push('/main/active-tickets/conference');
    this.props.setVideoData({ url: videoURL });
    get(`https://videodoctor.pp.ua${videoURL}`)
      .then((result) => {
        const { ...VIDEO_DATA } = result.data.connect_info;
        console.log(VIDEO_DATA);
        this.props.setVideoData({ videoData: VIDEO_DATA });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="main-page__section main-page__section_active-tickets ActiveTickets">
        {this.state.loading ? (
          <Preloader />
        ) : (
          <div className="cards-list">
            {this.state.activeTickets.map((item, index) => (
              <Card
                key={item.id}
                id={item.id}
                avatar={item.avatar}
                doctor={item.doctor}
                desc={item.desc}
                cost={item.new_price}
                requestCount={item.request_count}
                leftBtnText="Start communication"
                leftBtnAction={() => this.leftBtnFunc(item.url)}
                rightBtnText={this.props.userType === 10 ? 'END' : null}
                rightBtnAction={this.rightBtnFunc}
                page="active-tickets"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { push, setVideoData }
)(ActiveTickets);

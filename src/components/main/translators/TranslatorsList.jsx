import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { get } from 'axios';

import MainNav from '../../navigation/MainNav';
import { TranslatorCard } from './translatorCard/TranslatorCard';
import Preloader from '../../preloader/Preloader';

let links = [
  {
    name: 'Conference',
    link: '/main/active-tickets/conference/',
  },
  {
    name: 'Translator',
    link: '/main/active-tickets/conference/translators',
  },
];

class TranslatorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translaters: [{}],
      loading: true,
    };
    this.update();
  }
  getApiCall = (API) => {
    get(API)
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        this.update();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  update = () => {
    const GET_TRANSLATORS_API = `https://kvonda.com/api_v1/room/findtranslaters?order_id=${
      this.props.orderId
    }`;
    get(GET_TRANSLATORS_API)
      .then((res) => {
        this.setState({
          translaters: res.data.translaters,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  action = (id, userId, isSent) => {
    if (isSent === 1) {
      const DEL_TRANSLATOR = `https://kvonda.com/api_v1/room/deletetranslater?order_id=${
        this.props.orderId
      }&id=${id}`;
      this.getApiCall(DEL_TRANSLATOR);
    } else {
      const SET_TRANSLATOR = `https://kvonda.com/api_v1/room/addtranslater?order_id=${
        this.props.orderId
      }&id=${userId}`;
      this.getApiCall(SET_TRANSLATOR);
    }
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="conference-block">
        <MainNav links={links} />
        <section className="main-page__section">
          {this.state.loading ? (
            <Preloader />
          ) : (
            <div className="translators-list card">
              {this.state.translaters.map((item) => (
                <TranslatorCard
                  key={item.id}
                  userId={item.user_id}
                  avatar={item.avatar}
                  active={item.active}
                  id={item.id}
                  blocked={item.blocked}
                  name={item.name}
                  price={item.price}
                  sent={item.sent_request}
                  action={() =>
                    this.action(item.id, item.user_id, item.sent_request)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
}
const MSTP = (state) => ({
  orderId: state.videoCall.videoData.$order_id_g,
  roomId: state.videoCall.videoData.$room_id_g,
});

export default connect(
  MSTP,
  { push }
)(TranslatorsList);

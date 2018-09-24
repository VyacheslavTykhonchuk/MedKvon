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
      translaters: [],
      loading: true,
    };
    const GET_TRANSLATORS_API =
      'https://videodoctor.pp.ua/api_v1/room/findtranslaters?order_id=37';
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
  }
  action = () => {
    this.props.push('/main/active-tickets/conference/');
    const sdfdf = {
      active: '',
      avatar: 'https://videodoctor.pp.ua/uploads/users/avatar_15b_e16.png',
      blocked: '',
      id: 109,
      name: 'translater translater',
      price: 9,
    };
  };
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
                  avatar={item.avatar}
                  active={item.active}
                  id={item.id}
                  blocked={item.blocked}
                  name={item.name}
                  price={item.price}
                  action={this.action}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { push }
)(TranslatorsList);

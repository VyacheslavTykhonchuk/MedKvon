import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { get } from 'axios';

import MainNav from '../../navigation/MainNav';
import { TranslatorCard } from './translatorCard/TranslatorCard';

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

    const GET_TRANSLATORS_API = '';
    get(GET_TRANSLATORS_API)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  action = () => {
    this.props.push('/main/active-tickets/conference/');
  };
  render() {
    return (
      <div className="conference-block">
        <MainNav links={links} />
        <section className="main-page__section">
          <div className="translators-list card">
            <TranslatorCard
              avatar="https://cdn.shopify.com/s/files/1/0434/4749/files/Arthur_Shelby_Hair_1_1024x1024.jpg?v=1510317299"
              name="John Melson"
              price="$100"
              action={this.action}
            />
             <TranslatorCard
              avatar="https://cdn.shopify.com/s/files/1/0434/4749/files/Arthur_Shelby_Hair_1_1024x1024.jpg?v=1510317299"
              name="John Melson"
              price="$100"
              action={this.action}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { push }
)(TranslatorsList);

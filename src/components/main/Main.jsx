import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Proposals from './proposals/Proposals';
import ActiveTickets from './active-tickets/ActiveTickets';
import HistoryTab from './history/History';
import Conference from './conference/Conference';
import Video from './video/Video';

import MainNav from '../navigation/MainNav';
import FooterNav from '../footer-nav/FooterNav';

let links = [
  {
    name: 'Dashboard',
    link: '/main',
  },
  {
    name: 'Active tickets',
    link: '/main/active-tickets',
  },
  {
    name: 'History',
    link: '/main/history',
  },
];
class Main extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="main-page">
        <MainNav links={links} />
        <section className="main-page__section">
          <Switch>
            <Route exact path="/main" component={Dashboard} />
            <Route exact path="/main/proposals" component={Proposals} />
            <Route
              exact
              path="/main/active-tickets/conference"
              component={Conference}
            />
            <Route
              exact
              path="/main/active-tickets"
              component={ActiveTickets}
            />
            <Route path="/main/history" component={HistoryTab} />
            <Route
              path="/main/active-tickets/conference/video-call"
              component={Video}
            />
           
          </Switch>
        </section>
        {this.props.location.pathname ===
        '/main/active-tickets/conference/video-call' ? null : (
          <FooterNav />
        )}
      </div>
    );
  }
}

export default Main;

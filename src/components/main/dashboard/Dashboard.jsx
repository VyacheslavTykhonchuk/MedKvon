import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { showProposals } from '../../../actions/userActions';
import { push } from 'connected-react-router';

import Preloader from '../../preloader/Preloader';
import Card from '../../card/Card';

const mapDispatchToProps = {
  showProposals,
  push,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardCards: [],
      loading: true,
    };

    axios.get(`https://videodoctor.pp.ua/api_v1/dashboard`).then((res) => {
      const dashboardCards = res.data;
      this.setState({ dashboardCards: dashboardCards.data, loading: false });
    });
  }

  leftBtnAction = (id) => {
    this.props.showProposals(id);
    this.props.push('/main/proposals');
  };

  rightBtnAction = (id) => {
    axios
      .get(`https://videodoctor.pp.ua/api_v1/order/deleteorder/${id}`)
      .then((res) => {
        const newCards = this.state.dashboardCards.filter(
          (item) => item.id !== id
        );
        this.setState({
          dashboardCards: newCards,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <div className="main-page__section main-page__section_dashboard Dashboard">
        {this.state.loading ? (
          <Preloader />
        ) : (
          <div className="cards-list">
            {this.state.dashboardCards.map((item, index) => (
              <Card
                key={item.id}
                doctor={item.doctor}
                desc={item.desc}
                cost={item.price}
                requestCount={item.request_count}
                leftBtnText="PROPOSALS OF DOCTORS"
                leftBtnAction={() => this.leftBtnAction(item.id)}
                rightBtnText="Delete"
                rightBtnAction={() => this.rightBtnAction(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);

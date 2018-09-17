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

const mapStateToProps = (state) => ({
  userType: state.user.userType,
});

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
    if (this.props.userType === 30) {
      this.rightBtnAction(id);
    }
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
                id={item.id}
                avatar={item.avatar}
                doctor={item.doctor}
                activated={item.activated}
                desc={item.desc}
                cost={item.price}
                doctorPrice={item.new_price}
                requestCount={item.request_count}
                leftBtnText={
                  this.props.userType !== 10 ? 'ACCEPT' : 'PROPOSALS OF DOCTORS'
                }
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
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

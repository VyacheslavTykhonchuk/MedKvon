import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { showProposals } from '../../../actions/userActions';
import { push } from 'connected-react-router';

import Card from '../../card/Card';

// import CustomSelect from '../../select/CustomSelect';

// const selectOptions = [
//   {
//     val: 'This month',
//   },
//   {
//     val: 'Today',
//   },
//   {
//     val: 'This week',
//   },
//   {
//     val: 'This year',
//   },
// ];

const mapDispatchToProps = {
  showProposals,
  push,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dashboardCards: [] };

    axios.get(`https://videodoctor.pp.ua/api_v1/dashboard`).then((res) => {
      const dashboardCards = res.data;
      this.setState({ dashboardCards: dashboardCards.data });
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
        console.log(newCards);
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
        {/* <CustomSelect options={selectOptions} /> */}
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
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { showNotification } from '../../../actions/notificationActions';

import ProposalCard from '../../proposal-card/ProposalCard';

const mapStateToProps = (state) => ({
  proposalsID: state.user.proposalsID,
});
const mapDispatchToProps = {
  push,
  showNotification,
};
class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { proposalCards: [] };

    axios
      .get(
        `https://videodoctor.pp.ua/api_v1/dashboard/orderrequests/${
          this.props.proposalsID
        }`
      )
      .then((res) => {
        const proposalCards = res.data;
        this.setState({ proposalCards: proposalCards.data });
      })
      .catch((e) => {
        console.log(e);
        this.props.showNotification('Error', 'error');
      });
  }
  rightBtnFunc = () => {
    alert('right');
  };
  leftBtnFunc = (orderID, requestID) => {
    axios
      .post(
        `https://videodoctor.pp.ua/api_v1/dashboard/confirmorderrequests/${
          this.props.proposalsID
        }`,
        {
          order_id: orderID,
          request_id: requestID,
        }
      )
      .then((res) => {
        this.props.push('/main/active-tickets');
        this.props.showNotification('Success', 'success');
      })
      .catch((e) => {
        console.log(e);
        this.props.showNotification('Error', 'error');
      });
  };
  render() {
    return (
      <div className="main-page__section main-page__section_dashboard Proposals">
        <div className="cards-list">
          {this.state.proposalCards.map((item, index) => (
            <ProposalCard
              key={item.id}
              doctor={item.doctor}
              desc={item.desc}
              cost={item.price}
              requestCount={item.request_count}
              leftBtnText="Confirm"
              leftBtnAction={() => this.leftBtnFunc(item.id, item.request_id)}
              rightBtnText="Delete"
              rightBtnAction={this.rightBtnFunc}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Proposals);

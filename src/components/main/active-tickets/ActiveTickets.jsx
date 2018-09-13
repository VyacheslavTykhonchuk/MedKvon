import React from 'react';
import axios from 'axios';

import Card from '../../card/Card';
import Preloader from '../../preloader/Preloader';

class ActiveTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTickets: [], loading: true };

    axios.get(`https://videodoctor.pp.ua/api_v1/activetickets`).then((res) => {
      const activeTickets = res.data;
      this.setState({ activeTickets: activeTickets.data, loading: false });
    });
  }

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
                doctor={item.doctor}
                desc={item.desc}
                cost={item.new_price}
                requestCount={item.request_count}
                leftBtnText="Start communication"
                leftBtnAction={this.leftBtnFunc}
                rightBtnText="END"
                rightBtnAction={this.rightBtnFunc}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ActiveTickets;

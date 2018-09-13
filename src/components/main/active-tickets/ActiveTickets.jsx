import React from 'react';
import axios from 'axios';

// import CustomSelect from '../../select/CustomSelect';
import Card from '../../card/Card';

// decoys

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
//

class ActiveTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTickets: [] };

    axios.get(`https://videodoctor.pp.ua/api_v1/activetickets`).then((res) => {
      const activeTickets = res.data;
      this.setState({ activeTickets: activeTickets.data });
    });
  }

  render() {
    return (
      <div className="main-page__section main-page__section_active-tickets ActiveTickets">
        {/* <CustomSelect options={selectOptions} /> */}
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
      </div>
    );
  }
}

export default ActiveTickets;

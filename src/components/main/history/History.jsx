import React from 'react';
import axios from 'axios';

// import CustomSelect from '../../select/CustomSelect';
import HistoryCard from '../../history-card/HistoryCard';

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

class HistoryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyCards: [] };

    axios.get(`https://videodoctor.pp.ua/api_v1/history`).then((res) => {
      const historyCards = res.data;
      this.setState({ historyCards: historyCards.data });
    });
  }

  render() {
    return (
      <div className="main-page__section main-page__section_dashboard Dashboard">
        {/* <CustomSelect options={selectOptions} /> */}
        <div className="cards-list">
          {this.state.historyCards.map((item, index) => (
            <HistoryCard
              key={item.id}
              doctor={item.doctor}
              desc={item.desc}
              cost={item.price}
              requestCount={item.request_count}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HistoryTab;

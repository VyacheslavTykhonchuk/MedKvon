import React from 'react';
import axios from 'axios';

import HistoryCard from '../../history-card/HistoryCard';
import Preloader from '../../preloader/Preloader';

class HistoryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyCards: [],loading:true };

    axios.get(`https://videodoctor.pp.ua/api_v1/history`).then((res) => {
      const historyCards = res.data;
      this.setState({ historyCards: historyCards.data,loading:false });
    });
  }

  render() {
    return (
      <div className="main-page__section main-page__section_dashboard Dashboard">
        {this.state.loading ? (
          <Preloader />
        ) : (
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
        )}
      </div>
    );
  }
}

export default HistoryTab;

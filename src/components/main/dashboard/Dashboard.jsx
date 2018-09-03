import React from "react";
import axios from "axios";

import CustomSelect from "../../select/CustomSelect";
import Card from "../../card/Card";

const selectOptions = [
  {
    val: "This month"
  },
  {
    val: "Today"
  },
  {
    val: "This week"
  },
  {
    val: "This year"
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dashboardCards: [] };
  }
  componentWillMount() {
    axios.get(`https://videodoctor.pp.ua/api_v1/dashboard`).then(res => {
      const dashboardCards = res.data;
      this.setState({ dashboardCards: dashboardCards.data });
      console.log(dashboardCards.data);
    });
  }
  render() {
    return (
      <div className="main-page__section main-page__section_dashboard Dashboard">
        <CustomSelect options={selectOptions} />
        <div className="cards-list">
          {this.state.dashboardCards.map((item, index) => (
            <Card
              key={index}
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

export default Dashboard;

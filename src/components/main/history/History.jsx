import React from "react";
import CustomSelect from "../../select/CustomSelect";
import HistoryCard from "../../history-card/HistoryCard";

// decoys

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
const historyCards = [
  {
    doctor: "Optometrist",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    cost: 75
  },
  {
    doctor: "Dermatologist",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veniam necessitatibus cupiditate.`,
    cost: 35
  },
  {
    doctor: "Cardiologist",
    desc: `Assumenda veniam necessitatibus cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veniam necessitatibus cupiditate.`,
    cost: 125
  }
];
//
const HistoryTab = props => (
  <div className="main-page__section main-page__section_dashboard Dashboard">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      {historyCards.map((item, index) => (
        <HistoryCard
          key={index}
          doctor={item.doctor}
          desc={item.desc}
          cost={item.cost}
        />
      ))}
    </div>
  </div>
);

export default HistoryTab;

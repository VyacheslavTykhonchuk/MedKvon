import React from "react";
import CustomSelect from "../../select/CustomSelect";
import Card from "../../card/Card";

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

const activeCards = [
  {
    doctor: "Gynecologist",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veniam necessitatibus cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    cost: 96
  },
  {
    doctor: "Obstetrician",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.  Nesciunt delectus accusantium eos enim itaque quis atque neque nemo ut.`,
    cost: 85
  }
];
//
const ActiveTickets = props => (
  <div className="main-page__section main-page__section_active-tickets ActiveTickets">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      {activeCards.map((item, index) => (
        <Card
          key={index}
          doctor={item.doctor}
          desc={item.desc}
          cost={item.cost}
        />
      ))}
    </div>
  </div>
);

export default ActiveTickets;

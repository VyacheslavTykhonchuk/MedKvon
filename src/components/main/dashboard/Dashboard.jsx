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
const cardContent = [
  {
    doctor: "Obstetrician",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.  Nesciunt delectus accusantium eos enim itaque quis atque neque nemo ut.`,
    cost: 50
  },
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
  },
  {
    doctor: "Gynecologist",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veniam necessitatibus cupiditate.`,
    cost: 96
  }
];
//
const Dashboard = props => (
  <div className="main-page__section main-page__section_dashboard Dashboard">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      {cardContent.map((item, index) => (
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

export default Dashboard;

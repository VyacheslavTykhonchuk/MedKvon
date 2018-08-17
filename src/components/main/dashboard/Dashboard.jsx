import React from "react";
import CustomSelect from "../../select/CustomSelect";
import Card from "../../card/Card";

// decoy
let selectOptions = [
  {
    name: "decoy"
  }
];
//
const Dashboard = props => (
  <div className="main-page__section main-page__section_dashboard Dashboard">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      <Card options={selectOptions} />
      <Card options={selectOptions} />
    </div>
  </div>
);

export default Dashboard;

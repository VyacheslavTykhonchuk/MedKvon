import React from "react";
import CustomSelect from "../../select/CustomSelect";
import Card from "../../card/Card";

// decoys
let selectOptions = [
  {
    name: "decoy"
  }
];
let cardContent = [
  {
    name: "decoy"
  }
];
//
const Dashboard = props => (
  <div className="main-page__section main-page__section_dashboard Dashboard">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      <Card content={cardContent} />
      <Card content={cardContent} />
      <Card content={cardContent} />
      <Card content={cardContent} />
    </div>
  </div>
);

export default Dashboard;

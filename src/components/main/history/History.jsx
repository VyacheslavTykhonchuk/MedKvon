import React from "react";
import CustomSelect from "../../select/CustomSelect";
import HistoryCard from "../../history-card/HistoryCard";

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
const HistoryTab = props => (
  <div className="main-page__section main-page__section_dashboard Dashboard">
    <CustomSelect options={selectOptions} />
    <div className="cards-list">
      <HistoryCard content={cardContent} />
      <HistoryCard content={cardContent} />
      <HistoryCard content={cardContent} />
      <HistoryCard content={cardContent} />
    </div>
  </div>
);

export default HistoryTab;

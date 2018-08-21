import React from "react";
import CreateTicketCard from "../../create-ticket-card/CreateTicketCard";
import CustomSelect from "../../select/CustomSelect";

const createTicketCards = [
  {
    title: `Obstetrics and gynecology`
  },
  {
    title: `General Practice SUBMIT`
  },
  {
    title: `Immunology`
  },
  {
    title: `Internal medicine`
  },
  {
    title: `Microbiology`
  },
  {
    title: `Laboratory medicine`
  },
  {
    title: `Obstetrics and gynecology`
  }
];

const StepTwo = props => (
  <div className="create-ticket__step-two">
    <CustomSelect selected="Step Two" />
    <div className="create-ticket__cards">
      {createTicketCards.map(item => (
        <CreateTicketCard
          key={item.title}
          title={item.title}
          showSubtitle="show"
          appearance="ticket-card_short"
        />
      ))}
    </div>
    <div />
  </div>
);

export default StepTwo;

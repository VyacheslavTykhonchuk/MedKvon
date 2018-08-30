import React from "react";
import CreateTicketCard from "../../create-ticket-card/CreateTicketCard";
import CustomSelect from "../../select/CustomSelect";

const createTicketCards = [
  {
    title: `Шейно-головная зона`
  },
  {
    title: `Средняя зона`
  },
  {
    title: `Поясничная зона`
  },
  {
    title: `Половая зона`
  },
  {
    title: `Нижняя зона`
  }
];

const selectOptions = [
  {
    val: "Step One"
  },
  {
    val: "Step Two",
    disabled: true
  },
  {
    val: "Step Three",
    disabled: true
  }
];

const StepOne = props => (
  <div className="create-ticket__step-one">
    <CustomSelect selected="Step One" options={selectOptions} />
    <div className="create-ticket__cards">
      {createTicketCards.map(item => (
        <CreateTicketCard
          key={item.title}
          title={item.title}
          link="/create-ticket/specialization"
        />
      ))}
    </div>
    <div />
  </div>
);

export default StepOne;

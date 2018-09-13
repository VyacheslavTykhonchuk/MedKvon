import React from 'react';
import { connect } from 'react-redux';

import CreateTicketCard from '../../create-ticket-card/CreateTicketCard';
import CustomSelect from '../../select/CustomSelect';
import Preloader from '../../preloader/Preloader';
const selectOptions = [
  {
    val: 'Step One',
  },
  {
    val: 'Step Two',
  },
  {
    val: 'Step Three',
  },
];

const mapStateToProps = (state) => ({
  docs: state.formData.doctorNames,
});

const StepDoctors = (props) => {
  let items;

  // eslint-disable-next-line
  props.docs === undefined
    ? false
    : (items = Object.keys(props.docs).map((key) => props.docs[key]));

  console.log(items);
  return (
    <div className="create-ticket__step-two create-ticket__step-doctors">
      <CustomSelect selected="Step Three" options={selectOptions} />
      {items === undefined ? (
        <Preloader />
      ) : (
        <div className="create-ticket__cards">
          {items.map((item) => (
            <CreateTicketCard
              key={item.id}
              id={item.id}
              title={item.firstname}
              lastName={item.lastname}
              rating={item.rating}
              about={item.about}
              avatar={item.avatar}
              showSubtitle="show"
              appearance="ticket-card_short"
              link="/create-ticket/ticket"
            />
          ))}
        </div>
      )}
      <div />
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(StepDoctors);

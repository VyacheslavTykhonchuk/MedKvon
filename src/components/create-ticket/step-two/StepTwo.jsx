import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import CreateTicketCard from '../../create-ticket-card/CreateTicketCard';
import CustomSelect from '../../select/CustomSelect';
import { fetchPosts, setSpecialization } from '../../../modules/formModule';

const mapStateToProps = (state) => ({
  items: state.formData.ticket[state.formData.bodyPart],
});
const mapDispatchToProps = {
  fetchPosts,
  push,
  setSpecialization,
};

const selectOptions = [
  {
    val: 'Step One',
  },
  {
    val: 'Step Two',
  },
  {
    val: 'Step Three',
    disabled: true,
  },
];

const StepTwo = (props) => {
  return (
    <div className="create-ticket__step-two">
      <CustomSelect selected="Step Two" options={selectOptions} />
      <div className="create-ticket__cards">
        {Object.values(props.items).map((item) => {
          return (
            <CreateTicketCard
              key={item.id}
              id={item.id}
              title={item.title}
              showSubtitle="show"
              appearance="ticket-card_short"
              action={() => {
                props.fetchPosts(item.id);
                props.setSpecialization(item.id);
                props.push('/create-ticket/doctors');
              }}
            />
          );
        })}
      </div>
      <div />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTwo);

import React from 'react';
import CreateTicketCard from '../../create-ticket-card/CreateTicketCard';
import CustomSelect from '../../select/CustomSelect';

import { chooseBodyPart } from '../../../modules/formModule';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const mapStateToProps = (state) => ({
  items: state.formData.ticket,
});

const mapDispatchToProps = {
  chooseBodyPart,
  push,
};

const selectOptions = [
  {
    val: 'Step One',
  },
  {
    val: 'Step Two',
    disabled: true,
  },
  {
    val: 'Step Three',
    disabled: true,
  },
];

const StepOne = (props) => (
  <div className="create-ticket__step-one">
    <CustomSelect selected="Step One" options={selectOptions} />
    <div className="create-ticket__cards">
      {Object.keys(props.items).map((item) => (
        <CreateTicketCard
          key={item}
          title={item}
          data={item}
          action={() => {
            props.chooseBodyPart(item);
            props.push('/create-ticket/specialization');
          }}
        />
      ))}
      
    </div>
    <div />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepOne);

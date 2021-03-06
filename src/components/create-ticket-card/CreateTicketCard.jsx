import React from 'react';
import Btn from '../buttons/Btn';

const CreateTicketCard = (props) => (
  <div
    className={
      props.appearance
        ? 'ticket-card card ' + props.appearance
        : 'ticket-card card'
    }
  >
    {props.showSubtitle === 'show' ? (
      <span className="ticket-card__subtitle">Specialization</span>
    ) : (
      ''
    )}

    <h4 className="ticket-card__title">{props.title}</h4>

    <Btn
      text={'next'}
      appearing={'btn_small btn_blue ticket-card__btn'}
      linkTo={props.link}
      action={props.action}
    />
  </div>
);

export default CreateTicketCard;

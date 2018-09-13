import React from 'react';
import PropTypes from 'prop-types';

import doctorImg from './../../assets/img/doctor.svg';

const DoctorNameCard = ({
  id,
  name,
  lastName,
  rating,
  about,
  avatar,
  onCheck,
  checked,
}) => (
  <div className="card DoctorNameCard">
    <div className="card__left">
      <div className="card__avatar-holder">
        <img src={avatar} alt="" className="card__avatar" />
      </div>
    </div>
    <div className="card__right">
      <span className="card__subtitle">About</span>
      <p className="card__text">{about}</p>
      <div className="card__info-wrap">
        <div className="info">
          <div className="info__heading">Name</div>
          <div className="info__content">{name}</div>
        </div>
        <div className="info">
          <div className="info__heading">Rating</div>
          <div className="info__content">{`${rating}/5`}</div>
        </div>
      </div>

      <div
        className={checked ? 'checkbox checked' : 'checkbox'}
        onClick={onCheck}
      >
        <div className="checkbox_check">✔</div>
      </div>
    </div>
  </div>
);

DoctorNameCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  lastName: PropTypes.string,
  rating: PropTypes.number,
  about: PropTypes.string,
  avatar: PropTypes.string,
  onCheck: PropTypes.func,
  checked: PropTypes.any,
};
DoctorNameCard.defaultProps = {
  avatar: doctorImg,
};

export default DoctorNameCard;

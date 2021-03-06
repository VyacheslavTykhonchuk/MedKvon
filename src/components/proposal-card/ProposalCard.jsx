import React from 'react';
import PropTypes from 'prop-types';

import Btn from '../buttons/Btn';

import doctorImg from './../../assets/img/doctor.svg';

const Card = ({
  doctor,
  desc,
  avatar,
  cost,
  requestCount,
  leftBtnAction,
  rightBtnAction,
  leftBtnText,
  rightBtnText,
  doctorPrice,
}) => (
  <div className="card">
    <div className="card__left">
      <div className="card__avatar-holder">
        <img src={avatar} alt="" className="card__avatar" />
      </div>
    </div>
    <div className="card__right">
      <span className="card__subtitle">Description</span>
      <p className="card__text">{desc}</p>
      <div className="card__info-wrap">
        <div className="info">
          <div className="info__heading"> Doctor</div>
          <div className="info__content">{doctor}</div>
        </div>
        {cost ? (
          <div className="info info_small">
            <div className="info__heading"> Cost</div>
            <div className="info__content"> $ {cost}</div>
            {doctorPrice ? (
              <div className="info info_small">
                <div className="info__heading"> Doctor price</div>
                <div className="info__content"> $ {doctorPrice}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className={
          requestCount <= 0 ? 'card__btns card__btns_disabled' : 'card__btns'
        }
      >
        {requestCount ? (
          <div className="request-count">{requestCount}</div>
        ) : (
          ''
        )}
        <Btn
          action={leftBtnAction}
          text={leftBtnText}
          appearing={'btn_small btn_blue'}
        />
        <Btn
          action={rightBtnAction}
          text={rightBtnText}
          appearing={'btn_small btn_transparent'}
        />
      </div>
    </div>
  </div>
);

Card.propTypes = {
  doctor: PropTypes.string,
  desc: PropTypes.string,
  cost: PropTypes.number,
  avatar: PropTypes.any,
  requestCount: PropTypes.number,
};
Card.defaultProps = {
  avatar: doctorImg,
};

export default Card;

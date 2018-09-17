import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../buttons/Btn';
import doctorImg from './../../assets/img/doctor.svg';
import { push } from 'connected-react-router';
import { get } from 'axios';
import { connect } from 'react-redux';
import { previewTicketFrom } from '../../modules/formModule';

const mapDispatchToProps = {
  previewTicketFrom,
  push,
};

const showMore = (id) => {
  return get(`https://videodoctor.pp.ua/api_v1/order/${id}`)
    .then((result) => {
      const API_DATA = result.data.model;
      const formPreview = {
        title: API_DATA.title,
        price: API_DATA.price,
        formdata: API_DATA.formdata,
      };
      return formPreview;
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  id,
  previewTicketFrom,
  push,
}) => (
  <div className="card">
    <div className="card__left">
      <div className="card__avatar-holder">
        <img src={avatar} alt="" className="card__avatar" />
      </div>
    </div>
    <div className="card__right">
      <div
        className="card__show-more"
        onClick={() => {
          showMore(id)
            .then((result) => {
              previewTicketFrom(result);
              push('/create-ticket/ticket');
            })
            .catch((err) => {
              console.log(err);
              push('/main');
            });
        }}
      >
        Show more...
      </div>
      <span className="card__subtitle">Описание проблемы</span>
      <p className="card__text">{desc}</p>
      <div className="card__info-wrap">
        <div className="info">
          <div className="info__heading"> Врач</div>
          <div className="info__content">{doctor}</div>
        </div>
        {cost !== undefined && cost !== null ? (
          <div className="info">
            <div className="info__heading"> Сумма</div>
            <div className="info__content"> $ {cost}</div>
          </div>
        ) : (
          ''
        )}
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
  id: PropTypes.any,
};
Card.defaultProps = {
  avatar: doctorImg,
};

export default connect(
  null,
  mapDispatchToProps
)(Card);

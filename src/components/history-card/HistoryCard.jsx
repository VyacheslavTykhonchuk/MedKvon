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

const HistoryCard = ({
  doctor,
  desc,
  cost,
  avatar,
  id,
  previewTicketFrom,
  push,
}) => (
  <div className="history-card">
    <div className="history-card__left">
      <div className="history-card__avatar-holder">
        <img src={avatar} alt="" className="history-card__avatar" />
      </div>
    </div>
    <div className="history-card__right">
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
      <div className="history-card__info-wrap">
        <div className="info">
          <div className="info__heading"> Doctor</div>
          <div className="info__content"> {doctor}</div>
        </div>
        <div className="info">
          <div className="info__heading"> Cost</div>
          <div className="info__content"> $ {cost}</div>
        </div>
      </div>
      <span className="history-card__subtitle">Description</span>
      <p className="history-card__text">{desc}</p>
      <div className="history-card__btns">
        <Btn
          linkTo={'/main'}
          text={'SHOW COMMUNICATION HISTORY'}
          appearing={'btn_small btn_transparent btn_gray-border'}
        />
      </div>
    </div>
  </div>
);

HistoryCard.propTypes = {
  doctor: PropTypes.string.isRequired,
  desc: PropTypes.string,
  cost: PropTypes.number.isRequired,
  avatar: PropTypes.any,
};
HistoryCard.defaultProps = {
  avatar: doctorImg,
};

export default connect(
  null,
  mapDispatchToProps
)(HistoryCard);

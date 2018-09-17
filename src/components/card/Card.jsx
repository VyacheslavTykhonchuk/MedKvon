import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../buttons/Btn';
import doctorImg from './../../assets/img/doctor.svg';
import { push } from 'connected-react-router';
import { get } from 'axios';
import { connect } from 'react-redux';
import { previewTicketFrom } from '../../modules/formModule';
import InputBlock from '../input-block/InputBlock';
import { post } from 'axios';
import { showNotification } from '../../actions/notificationActions';

const mapDispatchToProps = {
  previewTicketFrom,
  push,
  showNotification,
};

const mapStateToProps = (state) => ({
  userType: state.user.userType,
});

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

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: this.props.activated,
      new_price: null,
    };
    if (this.props.userType === 20) {
      this.API_URL = 'https://videodoctor.pp.ua/api_v1/order/acceptorder';
      this.API_URL_DELETE = 'https://videodoctor.pp.ua/api_v1/order/cancelorder';
    } else if (this.props.userType === 20) {
      this.API_URL = 'https://videodoctor.pp.ua/api_v1/order/accepttranslate';
      this.API_URL_DELETE = 'https://videodoctor.pp.ua/api_v1/order/deletetranslate';
    }
  }
  acceptTicket = (id) => {
    let data;

    this.state.new_price
      ? (data = {
          new_price: this.state.new_price,
          order_id: id,
        })
      : (data = {
          order_id: id,
        });

    post(this.API_URL, data)
      .then((res) => {
        this.setState({
          activated: true,
        });
        this.props.showNotification('Accepted!', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  cancelTicket = (id) => {
    post(this.API_URL_DELETE, { order_id: id })
      .then((res) => {
        this.setState({
          activated: null,
        });
        this.props.showNotification('Canceled!', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleInputChange = (val, name) => {
    //  copy state
    const copiedState = { ...this.state };
    //  modify copied state
    copiedState[name] = val;
    // set modified state
    this.setState({
      ...copiedState,
    });
  };
  action = () => {
    if (this.props.userType === 20) {
      if (this.state.accepted === null) {
        this.cancelTicket(this.props.id);
      } else {
        this.acceptTicket(this.props.id);
      }
    } else if (this.props.userType === 30) {
      if (this.state.accepted === null) {
        this.cancelTicket(this.props.id);
      } else {
        this.acceptTicket(this.props.id);
      }
    } else {
      this.props.leftBtnAction();
    }
  };
  render() {
    return (
      <div className="card">
        <div className="card__left">
          <div className="card__avatar-holder">
            <img src={this.props.avatar} alt="" className="card__avatar" />
          </div>
        </div>
        <div className="card__right">
          <div
            className="card__show-more"
            onClick={() => {
              showMore(this.props.id)
                .then((result) => {
                  this.props.previewTicketFrom(result);
                  this.props.push('/create-ticket/ticket');
                })
                .catch((err) => {
                  console.log(err);
                  this.props.push('/main');
                });
            }}
          >
            Show more...
          </div>
          <span className="card__subtitle">Description</span>
          <p className="card__text">{this.props.desc}</p>
          <div className="card__info-wrap">
            <div className="info">
              <div className="info__heading">
                {this.props.userType === 10
                  ? 'Doctor'
                  : this.props.userType === 30
                    ? 'Languages'
                    : 'Doctor'}{' '}
              </div>
              <div className="info__content">{this.props.doctor}</div>
            </div>
            {this.props.cost !== undefined && this.props.cost !== null ? (
              <div className="info">
                <div className="info__heading"> Cost</div>
                <div className="info__content"> $ {this.props.cost}</div>
              </div>
            ) : (
              ''
            )}
          </div>
          {this.props.userType === 20 ? (
            <InputBlock
              heading="Your price"
              type="number"
              placeholder=""
              name="new_price"
              onChange={this.handleInputChange}
            />
          ) : null}
          <div
            className={
              this.props.requestCount <= 0
                ? 'card__btns card__btns_disabled'
                : this.props.userType === 20 && this.state.activated !== null
                  ? 'card__btns card__btns_gray'
                  : 'card__btns'
            }
          >
            {this.props.requestCount ? (
              <div className="request-count">{this.props.requestCount}</div>
            ) : (
              ''
            )}
            <Btn
              action={this.action}
              text={
                this.props.userType === 20 && this.state.activated !== null
                  ? 'Cancel'
                  : this.props.leftBtnText
              }
              appearing={'btn_small btn_blue'}
            />
            <Btn
              action={this.props.rightBtnAction}
              text={this.props.rightBtnText}
              appearing={'btn_small btn_transparent'}
            />
          </div>
        </div>
      </div>
    );
  }
}
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
  mapStateToProps,
  mapDispatchToProps
)(Card);

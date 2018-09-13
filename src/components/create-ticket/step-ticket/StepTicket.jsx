import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import InputBlock from '../../input-block/InputBlock';
import Btn from '../../buttons/Btn';
import Switch from '../../switch/Switch';

class StepTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {},
      category: this.props.category || 9,
      doctors_ids_str: this.props.selectedDocs || '41',
    };
  }

  handleInputChange = (val, name) => {
    if (name === 'title' || name === 'price') {
      this.setState({
        [name]: val,
      });
      return;
    }
    //  copy state
    const filledForm = { ...this.state.formdata };
    //  modify copied state
    filledForm[name] = val;
    // set modified state
    this.setState({
      formdata: filledForm,
    });
  };
  handleSubmit = () => {
    const API_URL = 'https://videodoctor.pp.ua/api_v1/order/createorder';
    const FORM_DATA = this.state;
    console.log(FORM_DATA);

    axios
      .post(API_URL, FORM_DATA)
      .then((res) => {
        const data = res.data;
        console.log('__res_____');
        console.log(res);
        console.log('____data___');
        console.log(data);
        if (data.error) {
          console.log('____data.error___');

          console.log(data.error);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="create-ticket__step-ticket ticket-form">
        <div className="hint">Анкета пациента</div>
        <section className="account-card card">
          <div className="account-card__personal-info">
            <div className="account-card__inputs-wrap">
              <InputBlock
                heading="Short description"
                value=""
                type="text"
                appearing=""
                placeholder=""
                onChange={this.handleInputChange}
                name="title"
              />
              <InputBlock
                heading="Price of consultation"
                value=""
                type="number"
                appearing=""
                placeholder=""
                onChange={this.handleInputChange}
                name="price"
              />
            </div>
          </div>
          <div className="account-card__personal-info">
            <div className="account-card__inputs-wrap">
              <InputBlock
                heading="Имя"
                value="Артем"
                type="text"
                appearing=""
                placeholder=""
                onChange={this.handleInputChange}
                name="firstName"
              />
              <InputBlock
                heading="Фамилия"
                value="Петровский"
                type="text"
                appearing=""
                placeholder=""
                onChange={this.handleInputChange}
                name="lastName"
              />
            </div>
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Почта"
              value="test@gmail.com"
              type="email"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="email"
            />
          </div>
          <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
            <InputBlock
              heading="Телефон"
              value="+39 099 99 9 9 99"
              type="tel"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="phone"
            />
            <InputBlock
              heading="Дата"
              value="26. 12. 1992"
              type="text"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="birthday"
            />
          </div>
          <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
            <InputBlock
              heading="Страна"
              value="Украина"
              type="text"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="country"
            />
            <InputBlock
              heading="Язык"
              value="Украинский"
              type="text"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="language"
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="О себе"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="user_desc"
            />
          </div>
          <div className="heading">Цель консультации</div>
          <div className="switches-block">
            {this.props.consSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.props.onSwitchClick(index, 'consSwitches')}
                {...item}
              />
            ))}
          </div>
          <div className="heading">Аллергические реакции</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              onClick={() => this.props.onSwitchClick('allergy')}
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Укажите на что…"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="allergy_desc"
            />
          </div>
          <div className="heading">
            Ранее перенесеннные заболевания или актуальные заболевания:
          </div>
          <div className="switches-block">
            {this.props.illSwitches.map((item, index) => (
              <Switch
                key={index}
                {...item}
                onClick={() => this.props.onSwitchClick(index, 'illSwitches')}
              />
            ))}
          </div>
          <div className="heading">Курение</div>
          <div className="switches-block">
            <Switch isActive={false} />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Укажите на что…"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="smoking_desc"
            />
          </div>

          <div className="heading">Aлкоголь</div>
          <div className="switches-block">
            <Switch isActive={false} />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Укажите на что…"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="alcohol_desc"
            />
          </div>

          <div className="heading">Физические упражнения</div>
          <div className="switches-block">
            {this.props.sportSwitches.map((item, index) => (
              <Switch
                key={index}
                {...item}
                onClick={() => this.props.onSwitchClick(index, 'sportSwitches')}
              />
            ))}
          </div>
          <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
            <InputBlock
              heading="Укажите ваш вес"
              value=""
              appearing=""
              placeholder=""
              type="number"
              onChange={this.handleInputChange}
              name="weight"
            />
            <InputBlock
              heading="Укажите ваш рост"
              value=""
              appearing=""
              placeholder=""
              type="number"
              onChange={this.handleInputChange}
              name="height"
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Ранее перенесенные операции или заболевания требующие госпитализации"
              value=""
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="height"
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              heading="Ранее перенесенные операции или заболевания требующие госпитализации"
              value=""
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              onChange={this.handleInputChange}
              name="height"
            />
          </div>
          <Btn
            text={'отправить'}
            appearing={'btn_small btn_blue'}
            action={this.handleSubmit}
          />
        </section>
      </div>
    );
  }
}

StepTicket.propTypes = {
  consSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string,
    })
  ),
  illSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string,
    })
  ),
  sportSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string,
    })
  ),
  onSwitchClick: PropTypes.func,
};

function toggleSwitch(id, arrType) {
  return {
    type: 'TOGGLE_SWITCH',
    id,
    arrType,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchClick: (id, arrType) => {
      dispatch(toggleSwitch(id, arrType));
    },
  };
};

const mapStateToProps = (state) => ({
  consSwitches: state.switches.consSwitches,
  illSwitches: state.switches.illSwitches,
  sportSwitches: state.switches.sportSwitches,
  category: state.formData.docSpecId,
});

const StepTickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTicket);

export default StepTickets;

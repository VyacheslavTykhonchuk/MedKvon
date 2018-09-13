import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import InputBlock from '../../input-block/InputBlock';
import Btn from '../../buttons/Btn';
import Switch from '../../switch/Switch';
import { showNotification } from '../../../actions/notificationActions';

class StepTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      price: null,
      category: this.props.category || 18,
      doctors_ids_str: this.props.doctorsIDs || '41',
      formdata: {
        written_opinion: '',
        firstname: '',
        lastname: '',
        patronymic: '',
        birthday: '',
        activity: '',
        phone: '',
        email: '',
        timefrom: '',
        timeto: '',
        timezone: '',
        diagnostics: '',
        recommendations: '',
        second_opinion: '',
        allergic_reactions: '',
        allergic_comment: '',
        heart_diseases: '',
        stomach_diseases: '',
        lung_diseases: '',
        neurological_diseases: '',
        kidney_diseases: '',
        joints_diseases: '',
        diabetes_diseases: '',
        thyroid_diseases: '',
        blood_diseases: '',
        eye_diseases: '',
        other_diseases: '',
        other_diseases_comment: '',
        smoking: '',
        smoking_comment: '',
        alcohol: '',
        alcohol_comment: '',
        physical_exercises: '',
        height: '',
        weight: '',
        bmi: '',
        hospitalization_hospital_1: '',
        medicaments_name_1: '',
      },
    };
  }

  handleInputChange = (val, name) => {
    // check req.
    if (name === 'title' || name === 'price') {
      this.setState({
        [name]: val,
      });
      return;
    }
    //  copy state
    const ticketForm = { ...this.state.formdata };
    //  modify copied state
    ticketForm[name] = val;
    // set modified state
    this.setState({
      formdata: ticketForm,
    });
  };

  onSwitchClick = (name) => {
    // toggle switches
    this.state.formdata[name]
      ? this.handleInputChange('', name)
      : this.handleInputChange('on', name);
  };
  handleSubmit = (e) => {
    if (this.state.title === null || this.state.price === null) {
      this.props.showNotification('Please, fill all required fields', 'error');
      console.log('erer');
      return;
    }
    // post data to API
    const formData = this.state,
      api = `https://videodoctor.pp.ua/api_v1/order/createorder`;
    axios
      .post(api, formData)
      .then((res) => {
        const data = res.data;
        if (data.error) {
          this.props.showNotification('Error!', 'error');
        } else {
          // show alert
          this.props.showNotification('Success!', 'success');
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
                heading="*Short description"
                type="text"
                onChange={this.handleInputChange}
                name="title"
              />
              <InputBlock
                heading="*Price of consultation"
                type="number"
                onChange={this.handleInputChange}
                name="price"
              />
              <Switch
                isActive={false}
                text="Written opinion:"
                onClick={() => this.onSwitchClick('written_opinion')}
              />
              <InputBlock
                heading="First Name"
                type="text"
                onChange={this.handleInputChange}
                name="firstname"
              />
              <InputBlock
                heading="Last Name"
                type="text"
                onChange={this.handleInputChange}
                name="lastname"
              />
              <InputBlock
                heading="Patronymic"
                type="text"
                onChange={this.handleInputChange}
                name="patronymic"
              />
              <InputBlock
                heading="Birthday Date"
                type="date"
                onChange={this.handleInputChange}
                name="birthday"
              />
              <InputBlock
                heading="Kind of activity"
                type="text"
                onChange={this.handleInputChange}
                name="activity"
              />

              <InputBlock
                heading="Phone"
                type="text"
                onChange={this.handleInputChange}
                name="phone"
              />
              <InputBlock
                heading="Email"
                type="text"
                onChange={this.handleInputChange}
                name="email"
              />
            </div>
          </div>
          <div className="heading">Convenient time for consultation</div>
          <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
            <InputBlock
              heading="From"
              type="num"
              onChange={this.handleInputChange}
              name="timefrom"
            />
            <InputBlock
              heading="To"
              type="num"
              onChange={this.handleInputChange}
              name="timeto"
            />
          </div>
          <div className="heading"> Purpose of the consultation:</div>
          <div className="switches-block">
            {this.props.consSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.name)}
                {...item}
              />
            ))}
          </div>

          <div className="heading">Аллергические реакции</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="alergy"
              onClick={() => this.onSwitchClick('allergic_reactions')}
            />
          </div>

          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="allergic_comment"
            />
          </div>
          <div className="heading">
            Ранее перенесеннные заболевания или актуальные заболевания:
          </div>
          <div className="switches-block">
            {this.props.illSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.name)}
                {...item}
              />
            ))}
          </div>
          <div className="heading">Курение</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="smoking"
              onClick={() => this.onSwitchClick('smoking')}
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="How many times a day?"
              onChange={this.handleInputChange}
              name="smoking_comment"
            />
          </div>
          <div className="heading">Aлкоголь</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="alcohol"
              onClick={() => this.onSwitchClick('alcohol')}
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="How many times a month?"
              onChange={this.handleInputChange}
              name="alcohol_comment"
            />
          </div>
          <div className="heading">Физические упражнения</div>
          <div className="switches-block">
            {this.props.sportSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.name)}
                {...item}
              />
            ))}
          </div>
          <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
            <InputBlock
              heading="Укажите ваш вес"
              value=""
              type="text"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="weight"
            />
            <InputBlock
              heading="Укажите ваш рост"
              value=""
              type="text"
              appearing=""
              placeholder=""
              onChange={this.handleInputChange}
              name="height"
            />
          </div>
          <div className="heading">
            Previous surgery or illness requiring hospitalization
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="hospitalization_hospital_1"
            />
          </div>
          <div className="heading">List of used medicaments</div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="medicaments_name_1"
            />
          </div>

          <Btn
            text={'отправить'}
            onClick={() => this.handleSubmit}
            action={this.handleSubmit}
            appearing={'btn_small btn_blue'}
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
    showNotification: (msg, style) => {
      dispatch(showNotification(msg, style));
    },
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
  doctors_ids_str: state.formData.doctorsIdsStr,
});

const StepTickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTicket);

export default StepTickets;

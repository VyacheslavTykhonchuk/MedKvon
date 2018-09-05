import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import InputBlock from "../../input-block/InputBlock";
import Btn from "../../buttons/Btn";
import Switch from "../../switch/Switch";

// const tableContent = [
//   {
//     date: "09/09/2017",
//     service: "Advice",
//     status: "Made",
//     price: "100$"
//   },
//   {
//     date: "10/12/2009",
//     service: "Advice",
//     status: "Made",
//     price: "1000$"
//   },
//   {
//     date: "30/02/2018",
//     service: "Advice",
//     status: "Pending",
//     price: "990$"
//   },
//   {
//     date: "26/06/2001",
//     service: "Advice",
//     status: "Made",
//     price: "860$"
//   },
//   {
//     date: "02/08/2014",
//     service: "Advice",
//     status: "Made",
//     price: "690$"
//   }
// ];

class StepTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketForm: {}
    };
  }

  handleInputChange = (val, name) => {
    //  copy state
    const ticketForm = { ...this.state.ticketForm };
    //  modify copied state
    ticketForm[name] = val;
    // set modified state
    this.setState({
      ticketForm: ticketForm
    });
  };
  onSwitchClick = name => {
    this.state.ticketForm[name]
      ? this.handleInputChange(false, name)
      : this.handleInputChange(true, name);
  };
  componentDidUpdate() {
    console.log(this.state.ticketForm);
  }
  handleSubmit = e => {
    // post data to API
    const formData = this.state.ticketForm,
      api = `https://videodoctor.pp.ua/api_v1/signup`;

    axios
      .post(api, { formData })
      .then(res => {
        const data = res.data;
        if (data.error) {
          // show alert
          let obj = data.validation;
          this.props.actions.showNotification(
            obj[Object.keys(obj)[0]],
            "error"
          );
        } else {
          const userToken = data["user-token"];
          axios.defaults.headers.common["user-token"] = userToken;
          this.props.actions.setUserToken(userToken);

          // LStorage
          localStorage.setItem("user-token", userToken);

          // show alert
          this.props.actions.showNotification("Welcome!", "success");
          this.props.actions.changePage("/main");
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    return (
      <div className="create-ticket__step-ticket ticket-form">
        <div className="hint">Анкета пациента</div>
        <section className="account-card card">
          <div className="account-card__personal-info">
            <div className="account-card__inputs-wrap">
              <InputBlock
                heading="Short description"
                type="text"
                onChange={this.handleInputChange}
                name="shortDescription"
              />
              <InputBlock
                heading="Price of consultation"
                type="num"
                onChange={this.handleInputChange}
                name="priceOfConsultation"
              />
              <InputBlock
                heading="Date of creation"
                type="text"
                onChange={this.handleInputChange}
                name="dateOfCreation"
              />
              <Switch
                isActive={false}
                text="Written opinion:"
                onClick={() => this.onSwitchClick("Written opinion:")}
              />
              <InputBlock
                heading="First Name"
                type="text"
                onChange={this.handleInputChange}
                name="firstName"
              />
              <InputBlock
                heading="Last Name"
                type="text"
                onChange={this.handleInputChange}
                name="lastName"
              />
              <InputBlock
                heading="Patronymic"
                type="text"
                onChange={this.handleInputChange}
                name="patronymic"
              />
              <InputBlock
                heading="Kind of activity"
                type="text"
                onChange={this.handleInputChange}
                name="kindOfActivity"
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
              name="timeFrom"
            />
            <InputBlock
              heading="To"
              type="num"
              onChange={this.handleInputChange}
              name="timeTo"
            />
          </div>
          <InputBlock
            heading="Select your timezone"
            type="num"
            onChange={this.handleInputChange}
            name="timezone"
          />
          <div className="heading"> Purpose of the consultation:</div>
          <div className="switches-block">
            {this.props.consSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.text)}
                {...item}
              />
            ))}
          </div>

          <div className="heading">Аллергические реакции</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="alergy"
              onClick={() => this.onSwitchClick("alergy")}
            />
          </div>
          {/*  */}

          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="alergyDetails"
            />
          </div>
          <div className="heading">
            Ранее перенесеннные заболевания или актуальные заболевания:
          </div>
          <div className="switches-block">
            {this.props.illSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.text)}
                {...item}
              />
            ))}
          </div>
          <div className="heading">Курение</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="smoking"
              onClick={() => this.onSwitchClick("smoking")}
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="smokingDetails"
            />
          </div>
          <div className="heading">Aлкоголь</div>
          <div className="switches-block">
            <Switch
              isActive={false}
              name="alcohol"
              onClick={() => this.onSwitchClick("alcohol")}
            />
          </div>
          <div className="account-card__inputs-wrap">
            <InputBlock
              type="text"
              appearing="input-block__dashed-border"
              placeholder=""
              heading="Укажите на что…"
              onChange={this.handleInputChange}
              name="alcoholDetails"
            />
          </div>
          <div className="heading">Физические упражнения</div>
          <div className="switches-block">
            {this.props.sportSwitches.map((item, index) => (
              <Switch
                key={index}
                onClick={() => this.onSwitchClick(item.text)}
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
              name="surgerys"
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
              name="medicaments"
            />
          </div>

          <Btn
            text={"отправить"}
            onClick={() => this.handleSubmit}
            action={this.handleSubmit}
            appearing={"btn_small btn_blue"}
          />
          {/* <div className="wallet-table__content grid-table">
            <div className="grid-table__row grid-table__row_head">
              <div className="grid-table__cell grid-table__cell_head">Date</div>
              <div className="grid-table__cell grid-table__cell_head">
                Service
              </div>
              <div className="grid-table__cell grid-table__cell_head">
                Status
              </div>
              <div className="grid-table__cell grid-table__cell_head">
                Price
              </div>
            </div>
            {tableContent.map(item => {
              return (
                <div key={item.date} className="grid-table__row">
                  <div className="grid-table__cell">{item.date}</div>
                  <div className="grid-table__cell">{item.service}</div>
                  <div className="grid-table__cell">{item.status}</div>
                  <div className="grid-table__cell">{item.price}</div>
                </div>
              );
            })}
          </div> */}
        </section>
      </div>
    );
  }
}
// const StepTicket = ({
//   consSwitches,
//   illSwitches,
//   sportSwitches,
//   onSwitchClick
// }) => (

// );

StepTicket.propTypes = {
  consSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string
    })
  ),
  illSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string
    })
  ),
  sportSwitches: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      text: PropTypes.string
    })
  ),
  onSwitchClick: PropTypes.func
};

function toggleSwitch(id, arrType) {
  return {
    type: "TOGGLE_SWITCH",
    id,
    arrType
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchClick: (id, arrType) => {
      dispatch(toggleSwitch(id, arrType));
    }
  };
};

const mapStateToProps = state => ({
  consSwitches: state.switches.consSwitches,
  illSwitches: state.switches.illSwitches,
  sportSwitches: state.switches.sportSwitches
});

const StepTickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTicket);

export default StepTickets;

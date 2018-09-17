import React, { Component } from 'react';
import { connect } from 'react-redux';

import FooterNav from '../footer-nav/FooterNav';
import MainNav from '../navigation/MainNav';
import InputBlock from '../input-block/InputBlock';
import CustomSelect from '../select/CustomSelect';
import Btn from '../buttons/Btn';
import { get, post } from 'axios';
import { showNotification } from '../../actions/notificationActions';
import Preloader from '../preloader/Preloader';

const mapDispatchToProps = {
  showNotification,
};

const links = [
  {
    name: 'Wallet',
    link: '/wallet',
  },
];
const selectOptions = [
  {
    val: 'Pay Type',
  },
  {
    val: 'PayPal',
  },
  {
    val: 'Credit Card',
  },
];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replenishFormOpened: false,
      withdrawFormOpened: false,
      WithdrawalForm: {
        account: null,
        sum: null,
        type: null,
      },
      loading: true,
    };
    this.API_URL = `https://videodoctor.pp.ua/api_v1/wallet`;
    get(this.API_URL)
      .then((res) => {
        this.table = res.data.balans;
        console.log(res.data);
        this.setState({
          loading: false,
          userBallance: res.data.user_balanse,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  toggleReplenishForm = () => {
    this.setState({
      replenishFormOpened: !this.state.replenishFormOpened,
    });
  };
  toggleWithdrawForm = () => {
    this.setState({
      withdrawFormOpened: !this.state.withdrawFormOpened,
    });
  };
  handleSelectChange = (val) => {
    this.setState({
      WithdrawalForm: {
        ...this.state.WithdrawalForm,
        type: val,
      },
    });
  };
  handleInputChange = (val, name) => {
    //  copy state
    const withdraw = { ...this.state.WithdrawalForm };
    //  modify copied state
    withdraw[name] = val;
    // set modified state
    this.setState({
      WithdrawalForm: withdraw,
    });
  };

  handleWithdrawSubmit = () => {
    const data = { WithdrawalForm: this.state.WithdrawalForm };
    post(this.API_URL, data)
      .then((res) => {
        if (res.data.error) {
          this.props.showNotification('Error! Please try again', 'error');
          return;
        }
        this.props.showNotification('Sent!', 'success');
        this.setState({
          withdrawFormOpened: false,
        });
      })
      .catch((e) => {
        this.props.showNotification('Error! Please try again', 'error');
        console.log(e);
      });
  };

  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    // var time =
    //   date + '/' + month + '/' + year + '/' + hour + ':' + min + ':' + sec;
    var time = date + '/' + month + '/' + year;
    return time;
  };
  render() {
    return (
      <div className="wallet-page main-page wallet">
        {this.state.loading ? (
          <Preloader />
        ) : (
          <div>
            <MainNav links={links} />
            <div className="hint">Balance</div>
            <section className="account-card wallet-card card">
              <div className="wallet-card__input-wrap">
                <InputBlock
                  heading="Your Balance"
                  type="text"
                  appearing="no-events"
                  value={`$ ${this.state.userBallance}`}
                />
              </div>
            </section>
            <section className="wallet__btns ">
              <button
                onClick={this.toggleReplenishForm}
                className="wallet__button"
              >
                <div>
                  <div className="wallet__button-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Capa_1"
                      viewBox="0 0 266.514 266.514"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M133.257,266.514C59.775,266.514,0,206.733,0,133.257S59.775,0,133.257,0 s133.257,59.781,133.257,133.257S206.739,266.514,133.257,266.514z M133.257,10.878c-67.477,0-122.379,54.896-122.379,122.379 S65.78,255.636,133.257,255.636s122.379-54.896,122.379-122.379S200.734,10.878,133.257,10.878z"
                        fill="#010002"
                      />
                      <path
                        d="M210.35,127.818h-71.654V56.164c0-3.002-2.431-5.439-5.439-5.439c-3.008,0-5.439,2.437-5.439,5.439 v71.654H56.164c-3.002,0-5.439,2.437-5.439,5.439c0,3.002,2.437,5.439,5.439,5.439h71.654v71.649c0,3.002,2.431,5.439,5.439,5.439 c3.008,0,5.439-2.437,5.439-5.439v-71.649h71.654c3.002,0,5.439-2.437,5.439-5.439 C215.789,130.255,213.353,127.818,210.35,127.818z"
                        fill="#010002"
                      />
                    </svg>
                  </div>
                  <span>To replenish the balance</span>
                </div>
              </button>
              <form
                action="replenish-form"
                className={
                  this.state.replenishFormOpened
                    ? 'wallet-form'
                    : 'wallet-form wallet-form_closed'
                }
                id="replenish-form"
              >
                <div className="heading">Replenish</div>
                <CustomSelect
                  selected="Pay Type"
                  appereance="custom-select_black"
                  options={selectOptions}
                  passVal={this.handleSelectChange}
                />
                <InputBlock
                  heading="Enter the account or card number"
                  type="number"
                  name="replenish-card"
                  placeholder=""
                  onChange={this.handleInputChange}
                />

                <InputBlock
                  heading="Enter amount"
                  type="number"
                  name="replenish-amount"
                  placeholder=""
                  onChange={this.handleInputChange}
                />
                <Btn
                  text={'Send'}
                  appearing={'btn_small btn_blue'}
                  action={this.handleSubmit}
                />
              </form>
              <button
                onClick={this.toggleWithdrawForm}
                className="wallet__button"
              >
                <div>
                  <div className="wallet__button-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Capa_1"
                      viewBox="0 0 266.514 266.514"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M133.257,266.514C59.775,266.514,0,206.733,0,133.257S59.775,0,133.257,0 s133.257,59.781,133.257,133.257S206.739,266.514,133.257,266.514z M133.257,10.878c-67.477,0-122.379,54.896-122.379,122.379 S65.78,255.636,133.257,255.636s122.379-54.896,122.379-122.379S200.734,10.878,133.257,10.878z"
                        fill="#010002"
                      />
                      <path
                        d="M210.35,127.818h-71.654V56.164c0-3.002-2.431-5.439-5.439-5.439c-3.008,0-5.439,2.437-5.439,5.439 v71.654H56.164c-3.002,0-5.439,2.437-5.439,5.439c0,3.002,2.437,5.439,5.439,5.439h71.654v71.649c0,3.002,2.431,5.439,5.439,5.439 c3.008,0,5.439-2.437,5.439-5.439v-71.649h71.654c3.002,0,5.439-2.437,5.439-5.439 C215.789,130.255,213.353,127.818,210.35,127.818z"
                        fill="#010002"
                      />
                    </svg>
                  </div>
                  <span>Request for withdrawal</span>
                </div>
              </button>
              <form
                action="withdraw-form"
                id="withdraw-form"
                className={
                  this.state.withdrawFormOpened
                    ? 'wallet-form'
                    : 'wallet-form wallet-form_closed'
                }
              >
                <div className="heading">Withdraw</div>
                <CustomSelect
                  selected="Pay Type"
                  appereance="custom-select_black"
                  options={selectOptions}
                  passVal={this.handleSelectChange}
                />
                <InputBlock
                  heading="Enter the account or card number"
                  type="text"
                  name="account"
                  placeholder=""
                  onChange={this.handleInputChange}
                />

                <InputBlock
                  heading="Enter amount"
                  type="number"
                  name="sum"
                  placeholder=""
                  onChange={this.handleInputChange}
                />
                <Btn
                  text={'Send'}
                  appearing={'btn_small btn_blue'}
                  action={this.handleWithdrawSubmit}
                />
              </form>
            </section>
            <section className="account-card wallet-table card half-transparent">
              <h3 className="wallet-table__title">
                The last transaction of your account
              </h3>

              <div className="wallet-table__content grid-table">
                <div className="grid-table__row grid-table__row_head">
                  <div className="grid-table__cell grid-table__cell_head">
                    Date
                  </div>
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
                {this.table.map((item) => {
                  console.log(
                    '______________________________________________________'
                  );

                  console.log(this.table);
                  return (
                    <div key={item.created_at} className="grid-table__row">
                      <div className="grid-table__cell">
                        {this.timeConverter(item.date)}
                      </div>
                      <div className="grid-table__cell">{item.typeName}</div>
                      <div className="grid-table__cell">{item.statusName}</div>
                      <div className="grid-table__cell">{item.sum}</div>
                    </div>
                  );
                })}
              </div>
            </section>
            <FooterNav />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Account);

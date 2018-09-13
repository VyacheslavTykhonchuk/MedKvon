import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import FooterNav from '../footer-nav/FooterNav';
import MainNav from '../navigation/MainNav';

import StepOne from './step-one/StepOne';
import StepTwo from './step-two/StepTwo';
import StepTicket from './step-ticket/StepTicket';
import StepDoctors from './step-doctors/StepDoctors';
import axios from 'axios';

import Preloader from '../preloader/Preloader';
import { requestDocsList } from '../../modules/formModule';

let links = [
  {
    name: 'Create Ticket',
    link: '/create-ticket',
  },
];

const mapDispatchToProps = {
  requestDocsList,
};

class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    axios
      .get('https://videodoctor.pp.ua/api_v1/order/createorder')
      .then((res) => {
        this.props.requestDocsList(res.data.position);
        this.setState({
          loading: false,
        });
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div className="create-ticket-page main-page">
        <MainNav links={links} />
        <section className="main-page__section info-page__section">
          {this.state.loading ? (
            <Preloader />
          ) : (
            <Switch>
              <Route exact path="/create-ticket" component={StepOne} />
              <Route path="/create-ticket/specialization" component={StepTwo} />
              <Route path="/create-ticket/doctors" component={StepDoctors} />
              <Route path="/create-ticket/ticket" component={StepTicket} />
            </Switch>
          )}
        </section>
        <FooterNav />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateTicket);

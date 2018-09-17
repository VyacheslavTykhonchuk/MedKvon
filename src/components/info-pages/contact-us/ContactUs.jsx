import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post } from 'axios';

import ContactsBlock from '../../contacts-block/ContactsBlock';
import CustomSelect from '../../select/CustomSelect';
import InputBlock from '../../input-block/InputBlock';
import Btn from '../../buttons/Btn';
import { showNotification } from '../../../actions/notificationActions';

const contacts = [
  {
    heading: `Address`,
    content: `7405 Transcanadienne, Suite 100 
        Saint-Laurent (Qc) Canada 
        H4T 1Z2`,
  },
  {
    heading: `E-mail`,
    content: `sts769@gmail.com`,
  },
  {
    heading: `Phone`,
    content: `+39 909 998 99`,
  },
];
const selectOptions = [
  {
    val: 'Technical support',
  },
  {
    val: 'Customer support',
  },
  {
    val: 'Doctor support',
  },
  {
    val: 'Translator questions',
  },
];

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackType: 'Technical support',
      feedback: {
        name: '',
        email: '',
        body: '',
      },
    };
  }

  handleInputChange = (val, name) => {
    //  copy state
    const updatedFeedback = { ...this.state.feedback };
    //  modify copied state
    updatedFeedback[name] = val;
    // set modified state
    this.setState({
      feedback: updatedFeedback,
    });
  };

  handleSelectChange = (val) => {
    this.setState({
      feedbackType: val,
    });
  };

  handleSubmit = () => {
    const feedback = this.state.feedback;

    for (const key in feedback) {
      if (feedback[key] === '') {
        this.props.actions.showNotification('Fill all fields!', 'error');
        return false;
      }
    }

    // post data to API
    const API_URL = 'https://videodoctor.pp.ua/api_v1/contact';
    const ContactForm = {
      subject: this.state.feedbackType,
      ...this.state.feedback,
    };

    post(API_URL, { ContactForm })
      .then((result) => {
        console.log(result);
        if (result.data.error) {
          const errs = result.data.validate;
          for (const key in errs) {
            if (errs.hasOwnProperty(key)) {
              const element = errs[key];
              this.props.actions.showNotification(element, 'error');
            }
          }
          return;
        }
        this.props.actions.showNotification('Sent!', 'success');
      })
      .catch((err) => {
        console.log(err);
        this.props.actions.showNotification('Error!', 'error');
      });

    // show alert
  };

  render() {
    return (
      <div className="main-page__section main-page__section_contact-us ContactUs">
        <div className="contact-us__contacts">
          {contacts.map((item) => (
            <ContactsBlock
              key={item.heading}
              heading={item.heading}
              content={item.content}
            />
          ))}
        </div>
        <CustomSelect
          selected="Technical support"
          appereance="custom-select_big"
          options={selectOptions}
          passVal={this.handleSelectChange}
        />
        <form action="" id="contact-us-form" className="tech-support">
          <InputBlock
            heading="* Email"
            type="email"
            name="email"
            appearing="input-block_gray-bg"
            placeholder=""
            onChange={this.handleInputChange}
          />
          <InputBlock
            heading="* Name"
            name="name"
            type="text"
            appearing="input-block_gray-bg"
            placeholder=""
            onChange={this.handleInputChange}
          />
          <InputBlock
            heading="* Message"
            name="body"
            type="text"
            appearing="input-block_gray-bg"
            placeholder=""
            onChange={this.handleInputChange}
          />
          <Btn
            text={'send'}
            appearing={'btn_small btn_blue'}
            action={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        showNotification,
      },
      dispatch
    ),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ContactUs);

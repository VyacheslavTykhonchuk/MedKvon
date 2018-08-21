import React from "react";
import ContactsBlock from "../../contacts-block/ContactsBlock";
import CustomSelect from "../../select/CustomSelect";
import InputBlock from "../../input-block/InputBlock";

const contacts = [
  {
    heading: `Address`,
    content: `7405 Transcanadienne, Suite 100 
        Saint-Laurent (Qc) Canada 
        H4T 1Z2`
  },
  {
    heading: `E-mail`,
    content: `sts769@gmail.com`
  },
  {
    heading: `Phone`,
    content: `+39 909 998 99`
  }
];

const ContactUs = props => (
  <div className="main-page__section main-page__section_contact-us ContactUs">
    <div className="contact-us__contacts">
      {contacts.map(item => (
        <ContactsBlock heading={item.heading} content={item.content} />
      ))}
    </div>
    <CustomSelect selected="Technical support" appereance="custom-select_big" />
    <form action="" className="tech-support">
      <InputBlock
        heading="* Email"
        type="email"
        appearing="input-block_gray-bg"
        placeholder=""
      />
      <InputBlock
        heading="* Name"
        type="text"
        appearing="input-block_gray-bg"
        placeholder=""
      />
      <InputBlock
        heading="* Message"
        type="text"
        appearing="input-block_gray-bg"
        placeholder=""
      />
    </form>
  </div>
);

export default ContactUs;

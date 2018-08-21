import React from "react";

const ContactsBlock = props => (
  <div className="contacts-block">
    <header className="contacts-block__heading"> {props.heading}</header>
    <section className="contacts-block__content">{props.content}</section>
  </div>
);

export default ContactsBlock;

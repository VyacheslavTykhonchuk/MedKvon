import React from 'react';

export const Message = ({  type, message, time,avatar }) => (
  <div className={`message-block ${type}`}>
    <time className="message-block__time">{time}</time>
    <article className="message-block__message">{message}</article>
    <img alt="userAvatar" src={avatar} className="message-block__avatar" />
  </div>
);

import React from 'react';
import Btn from '../../../buttons/Btn';

export const TranslatorCard = (props) => (
  <div className="translator">
    <div className="translator__avatar">
      <img src={props.avatar} alt="" />
    </div>
    <div className="translator__name">
      <div className="small-text">Name</div>
      <div className="big-text">{props.name}</div>
    </div>
    <div className="translator__price">
      <div className="small-text">Price</div>
      <div className="big-text big-text_blue">{props.price}</div>
    </div>
    <Btn
      action={props.action}
      text='Send request'
      appearing={'btn_small btn_blue'}
    />
  </div>
);
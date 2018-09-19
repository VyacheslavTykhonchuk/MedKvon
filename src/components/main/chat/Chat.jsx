import React, { Component } from 'react';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          name: 'Receiver',
          type: 'receiver',
          message: 'Hello there!',
          time: '11:00',
        },
        {
          name: 'Sender',
          type: 'sender',
          message: 'Hello to you!',
          time: '11:01',
        },
      ],
    };
  }
  closeChat = () => {
    console.log('Close Chat!');
  };
  render() {
    return (
      <div className="ChatComponent">
        <header>
          <div onClick={this.closeChat} className="close-chat">
            <svg
              width="25"
              height="18"
              viewBox="0 0 25 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="app" fill="none" fillRule="evenodd">
                <g id="Chat" transform="translate(-57 -34)" fill="#AEB8C0">
                  <g id="navigation/arrow" transform="translate(57 34)">
                    <g id="icon_arrow" transform="rotate(-180 12.5 9)">
                      <path
                        d="M24.7278243,8.34845028 L16.9800157,0.295683962 C16.6182822,-0.0701409432 16.0322489,-0.112535517 15.6105145,0.258736736 C15.2334793,0.590645982 15.2240853,1.23798033 15.5727447,1.59840525 L21.7921717,8.05244615 L0.401195798,8.05244615 C-0.133731933,8.05244615 -0.133731933,9.94722306 0.401195798,9.94722306 L21.7921717,9.94722306 L15.5727447,16.4012403 C15.2241337,16.7616178 15.2488827,17.3930365 15.6105145,17.7408614 C15.9923436,18.10806 16.6238024,18.0753759 16.9800157,17.7039142 L24.7278243,9.65121894 C25.1207471,9.21552588 25.0594098,8.72076463 24.7278243,8.34845028 Z"
                        id="Shape"
                        fillRule="nonzero"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </header>
        <section className="chat-container">
          <div className="message-block">
            <time className="message-block__time">11:44</time>
            <article className="message-block__message">Message text</article>
            <img alt="userAvatar" className="message-block__avatar" />
          </div>
        </section>

        <div className="user-input">
          <input type="text" placeholder="Type your messages …" />
          <button>Send</button>
        </div>
      </div>
    );
  }
}

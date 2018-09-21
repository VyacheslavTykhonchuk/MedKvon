import React, { Component } from 'react';
import { Message } from './Message/Message';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { get, post } from 'axios';
import Preloader from '../../preloader/Preloader';
import { mergeArrays } from '../../../utility/mergeArrs';
const mapStateToProps = (state) => ({
  userURL: state.videoCall.url,
});
const mapDispatchToProps = {
  push,
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userMessage: '',
      loading: true,
    };
    this.msgContainer = React.createRef();
    this.fetchMessages();
  }
  fetchMessages = () => {
    get(`https://videodoctor.pp.ua${this.props.userURL}`)
      .then((result) => {
        console.log()
        const { ...DATA } = result.data;
        this.setState({
          loading: false,
          room_id: DATA.room_id,
          order_id: DATA.order_id,
        });
        return { room_id: DATA.room_id, order_id: DATA.order_id };
      })
      .then((res) => {
        post('https://videodoctor.pp.ua/api_v1/room/messages', res)
          .then((result) => {
            const msgArr = result.data.data;
            const lastMessageId = msgArr[msgArr.length - 1].id;
            const objForCheckNewMsgs = { ...res, last_id: lastMessageId };
            this.setState({
              messages: msgArr,
              objForCheckNewMsgs: { ...objForCheckNewMsgs },
            });
            this.scrollToBottom();
          })
          .then((result) => {
            setInterval(() => {
              this.checkNewMessages(this.state.objForCheckNewMsgs);
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  checkNewMessages = (res) => {
    post('https://videodoctor.pp.ua/api_v1/room/messages', res)
      .then((result) => {
        const newMsgArr = result.data.data;
        const oldMsgArr = this.state.messages;
        if (newMsgArr.length > 0) {
          this.setState({
            messages: mergeArrays(oldMsgArr, newMsgArr),
          });
          this.scrollToBottom();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  scrollToBottom = () => {
    this.msgContainer.current.scrollTop = this.msgContainer.current.scrollHeight;
  };
  closeChat = () => {
    this.props.push('/main/active-tickets/conference');
  };
  handleChange = (event) => {
    this.setState({ userMessage: event.target.value });
  };
  sendMessage = () => {
    const data = {
      message: this.state.userMessage,
      room_id: this.state.room_id,
      order_id: this.state.order_id,
      file: '',
      fileFile: '',
    };
    post('https://videodoctor.pp.ua/api_v1/room/addmessage', data)
      .then((result) => {
        if (result.data.success) {
          return true;
        } else {
          return false;
        }
      })
      .then((res) => {
        if (res) {
          this.checkNewMessages(this.state.objForCheckNewMsgs);
          this.setState({
            userMessage: '',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        {this.state.loading ? (
          <Preloader />
        ) : (
          <section ref={this.msgContainer} className="chat-container">
            {this.state.messages.map((msgData) => (
              <Message
                key={msgData.time + msgData.message + Math.random()}
                avatar={msgData.avatar}
                type={msgData.type}
                message={msgData.message}
                time={msgData.time.slice(-5)}
                id={msgData.id}
                file={msgData.file}
              />
            ))}
          </section>
        )}
        <div className="user-input">
          <input
            type="text"
            placeholder="Type your messages …"
            value={this.state.userMessage}
            onChange={this.handleChange}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              id="Capa_1"
              viewBox="0 0 52 52"
            >
              <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z" />
            </svg>
            <span onClick={this.sendMessage}>Send</span>
          </button>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

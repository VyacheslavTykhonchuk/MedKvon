import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { get } from 'axios';
import Preloader from '../../preloader/Preloader';
import MainNav from '../../navigation/MainNav';

const mapStateToProps = (state) => ({
  videoURL: state.videoCall.url,
  userType: state.user.userType,
});

class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    get(`https://kvonda.com${this.props.videoURL}`)
      .then((result) => {
        const { doctor_avatar, doctor_name } = result.data;
        this.setState({
          doctor_avatar,
          doctor_name,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  startVideo = () => {
    this.props.push('/main/active-tickets/conference/video-call');
  };
  startChat = () => {
    this.props.push('/chat');
  };
  render() {
    let links;
    if (this.props.userType === 10) {
      links = [
        {
          name: 'Conference',
          link: '/main/active-tickets/conference/',
        },
        {
          name: 'Translator',
          link: '/main/active-tickets/conference/translators',
        },
      ];
    } else {
      links = [
        {
          name: 'Conference',
          link: '/main/active-tickets/conference/',
        },
      ];
    }
    return (
      <div className="conference-block">
        <MainNav links={links} />
        <section className="main-page__section">
          {this.state.loading ? (
            <Preloader />
          ) : (
            <div className="card">
              <div className="conference-block__avatar">
                <img src={this.state.doctor_avatar} alt="" />
              </div>
              <div className="conference-block__name">
                {this.state.doctor_name}
              </div>
              <div onClick={this.startVideo} className="circle circle_left">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="app"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g
                      id="Сonference"
                      transform="translate(-68 -397)"
                      stroke="#FFF"
                      strokeWidth="2"
                    >
                      <g id="Group" transform="translate(58 180)">
                        <g id="Oval-10">
                          <g id="Group-3" transform="translate(-57 168)">
                            <g id="ic_video" transform="matrix(-1 0 0 1 90 45)">
                              <path
                                d="M8,14.5714286 L2,18 L2,6 L8,9.42857143 L8,5 L22,5 L22,19 L8,19 L8,14.5714286 Z"
                                id="Combined-Shape"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div onClick={this.startChat} className="circle circle_right">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="app" fill="none" fillRule="evenodd">
                    <g id="Сonference" transform="translate(-363 -397)">
                      <g id="ic_message" transform="translate(361 395)">
                        <g id="Group" transform="translate(3 3)">
                          <polygon
                            id="Rectangle"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points="0 0 18 0 18 13 8 13 0 18"
                          />
                          <circle id="Oval" fill="#FFF" cx="5" cy="7" r="1" />
                          <circle
                            id="Oval-Copy"
                            fill="#FFF"
                            cx="9"
                            cy="7"
                            r="1"
                          />
                          <circle
                            id="Oval-Copy-2"
                            fill="#FFF"
                            cx="13"
                            cy="7"
                            r="1"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { push }
)(Conference);

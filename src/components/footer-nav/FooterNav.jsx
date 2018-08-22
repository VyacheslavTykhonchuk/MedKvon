import React from "react";
import { NavLink } from "react-router-dom";

const FooterNav = props => (
  <footer className="footer-nav">
    <NavLink
      activeClassName="footer-nav__item_active"
      to="/account"
      className="footer-nav__item"
    >
      <div className="footer-nav__icon-wrap">
        <svg
          className="footer-nav__icon"
          width="17"
          height="20"
          viewBox="0 0 17 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="app" fill="none" fillRule="evenodd" opacity="0.33">
            <g
              id="Dashboard"
              transform="translate(-50 -693)"
              fill="#000"
              fillRule="nonzero"
            >
              <path
                d="M67,712 C67,712.552285 66.5522847,713 66,713 C65.4477153,713 65,712.552285 65,712 L65,710 C65,708.343146 63.6568542,707 62,707 L55,707 C53.3431458,707 52,708.343146 52,710 L52,712 C52,712.552285 51.5522847,713 51,713 C50.4477153,713 50,712.552285 50,712 L50,710 C50,707.238576 52.2385763,705 55,705 L62,705 C64.7614237,705 67,707.238576 67,710 L67,712 Z M58.5,703 C55.7385763,703 53.5,700.761424 53.5,698 C53.5,695.238576 55.7385763,693 58.5,693 C61.2614237,693 63.5,695.238576 63.5,698 C63.5,700.761424 61.2614237,703 58.5,703 Z M58.5,701 C60.1568542,701 61.5,699.656854 61.5,698 C61.5,696.343146 60.1568542,695 58.5,695 C56.8431458,695 55.5,696.343146 55.5,698 C55.5,699.656854 56.8431458,701 58.5,701 Z"
                id="Combined-Shape"
              />
            </g>
          </g>
        </svg>
      </div>
    </NavLink>
    <NavLink
      activeClassName="footer-nav__item_active"
      to="/create-ticket/1"
      className="footer-nav__item"
    >
      <div className="footer-nav__icon-wrap">
        <svg
          width="24"
          height="20"
          viewBox="0 0 24 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="app" fill="none" fillRule="evenodd" opacity="0.33">
            <g id="Dashboard" transform="translate(-120 -693)" fill="#000">
              <g id="Group-2" transform="translate(120 693)">
                <path
                  d="M3,0 L21,0 C22.6568542,-1.38777878e-16 24,1.34314575 24,3 L24,17 C24,18.6568542 22.6568542,20 21,20 L3,20 C1.34314575,20 2.22044605e-16,18.6568542 0,17 L0,3 C-2.22044605e-16,1.34314575 1.34314575,4.16333634e-16 3,0 Z M3,2 C2.44771525,2 2,2.44771525 2,3 L2,17 C2,17.5522847 2.44771525,18 3,18 L21,18 C21.5522847,18 22,17.5522847 22,17 L22,3 C22,2.44771525 21.5522847,2 21,2 L3,2 Z"
                  id="Combined-Shape"
                />
                <rect
                  id="Rectangle-6"
                  x="11"
                  y="7"
                  width="2"
                  height="7"
                  rx="1"
                />
                <rect
                  id="Rectangle-6"
                  transform="rotate(90 12 10.5)"
                  x="11"
                  y="7"
                  width="2"
                  height="7"
                  rx="1"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </NavLink>
    <NavLink
      activeClassName="footer-nav__item_active"
      to="/main/dashboard"
      className="footer-nav__item"
    >
      <div className="footer-nav__icon-wrap">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="-144.405%"
              y1="-51.474%"
              x2="50%"
              y2="100%"
              id="linearGradient-1"
            >
              <stop stopColor="#0244FF" offset="0%" />
              <stop stopColor="#0188FF" offset="100%" />
            </linearGradient>
          </defs>
          <g id="app" fill="none" fillRule="evenodd">
            <g
              id="Dashboard"
              transform="translate(-197 -693)"
              fill="url(#linearGradient-1)"
              fillRule="nonzero"
            >
              <path
                d="M199,695 L199,700 L204,700 L204,695 L199,695 Z M198,693 L205,693 C205.552285,693 206,693.447715 206,694 L206,701 C206,701.552285 205.552285,702 205,702 L198,702 C197.447715,702 197,701.552285 197,701 L197,694 C197,693.447715 197.447715,693 198,693 Z M209,693 L216,693 C216.552285,693 217,693.447715 217,694 L217,701 C217,701.552285 216.552285,702 216,702 L209,702 C208.447715,702 208,701.552285 208,701 L208,694 C208,693.447715 208.447715,693 209,693 Z M210,700 L215,700 L215,695 L210,695 L210,700 Z M209,704 L216,704 C216.552285,704 217,704.447715 217,705 L217,712 C217,712.552285 216.552285,713 216,713 L209,713 C208.447715,713 208,712.552285 208,712 L208,705 C208,704.447715 208.447715,704 209,704 Z M210,711 L215,711 L215,706 L210,706 L210,711 Z M198,704 L205,704 C205.552285,704 206,704.447715 206,705 L206,712 C206,712.552285 205.552285,713 205,713 L198,713 C197.447715,713 197,712.552285 197,712 L197,705 C197,704.447715 197.447715,704 198,704 Z M199,711 L204,711 L204,706 L199,706 L199,711 Z"
                id="Combined-Shape"
              />
            </g>
          </g>
        </svg>
      </div>
    </NavLink>
    <NavLink
      activeClassName="footer-nav__item_active"
      to="/info-pages/about-us"
      className="footer-nav__item"
    >
      <div className="footer-nav__icon-wrap">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="app"
            fill="none"
            fillRule="evenodd"
            opacity="0.33"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g id="Dashboard" transform="translate(-269 -692)" stroke="#000">
              <g id="ic_listing" transform="translate(269 692)">
                <g
                  transform="translate(1.833 1.833)"
                  strokeWidth="2"
                  id="Group"
                >
                  <rect
                    id="Rectangle-2"
                    width="18.333"
                    height="18.333"
                    rx="4"
                  />
                  <circle id="Oval" cx="5.5" cy="5.5" r="1.833" />
                  <path d="M11,5.5 L14.6666667,5.5" id="Line" />
                  <path
                    d="M11,12.8333333 L14.6666667,12.8333333"
                    id="Line-Copy"
                  />
                  <circle id="Oval-Copy" cx="5.5" cy="12.833" r="1.833" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </NavLink>
    <NavLink
      activeClassName="footer-nav__item_active"
      to="/wallet"
      className="footer-nav__item"
    >
      <div className="footer-nav__icon-wrap">
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="app" fill="none" fillRule="evenodd" opacity="0.33">
            <g
              id="Dashboard"
              transform="translate(-343 -693)"
              fill="#000"
              fillRule="nonzero"
            >
              <g id="add_card" transform="translate(343 693)">
                <path
                  d="M2.45454545,2.58823529 L2.45454545,18.1176471 C2.45454545,18.8323685 1.90507674,19.4117647 1.22727273,19.4117647 C0.549468716,19.4117647 0,18.8323685 0,18.1176471 L0,1.29411765 C0,0.579396206 0.549468716,0 1.22727273,0 L21.3181818,0 C21.9959858,0 22.5454545,0.579396206 22.5454545,1.29411765 C22.5454545,2.00883909 21.9959858,2.58823529 21.3181818,2.58823529 L2.45454545,2.58823529 Z"
                  id="Rectangle-2"
                />
                <path
                  d="M18.0909091,15.5294118 C18.0909091,14.8146903 18.6403778,14.2352941 19.3181818,14.2352941 C19.9959858,14.2352941 20.5454545,14.8146903 20.5454545,15.5294118 L20.5454545,20.7058824 C20.5454545,21.4206038 19.9959858,22 19.3181818,22 C18.6403778,22 18.0909091,21.4206038 18.0909091,20.7058824 L18.0909091,15.5294118 Z"
                  id="Line"
                />
                <path
                  d="M16.8636364,19.4117647 C16.1858324,19.4117647 15.6363636,18.8323685 15.6363636,18.1176471 C15.6363636,17.4029256 16.1858324,16.8235294 16.8636364,16.8235294 L21.7727273,16.8235294 C22.4505313,16.8235294 23,17.4029256 23,18.1176471 C23,18.8323685 22.4505313,19.4117647 21.7727273,19.4117647 L16.8636364,19.4117647 Z"
                  id="Line"
                />
                <polygon
                  id="Line"
                  points="1.22727273 7.76470588 1.22727273 5.17647059 21.3181818 5.17647059 21.3181818 7.76470588"
                />
                <path
                  d="M20.0909091,1.29411765 C20.0909091,0.579396206 20.6403778,0 21.3181818,0 C21.9959858,0 22.5454545,0.579396206 22.5454545,1.29411765 L22.5454545,10.3529412 C22.5454545,11.0676626 21.9959858,11.6470588 21.3181818,11.6470588 C20.6403778,11.6470588 20.0909091,11.0676626 20.0909091,10.3529412 L20.0909091,1.29411765 Z"
                  id="Line"
                />
                <path
                  d="M1.22727273,19.4117647 C0.549468716,19.4117647 0,18.8323685 0,18.1176471 C0,17.4029256 0.549468716,16.8235294 1.22727273,16.8235294 L12.9545455,16.8235294 C13.6323495,16.8235294 14.1818182,17.4029256 14.1818182,18.1176471 C14.1818182,18.8323685 13.6323495,19.4117647 12.9545455,19.4117647 L1.22727273,19.4117647 Z"
                  id="Line"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </NavLink>
  </footer>
);

export default FooterNav;
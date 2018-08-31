import React from "react";

import FooterNav from "../footer-nav/FooterNav";
import MainNav from "../navigation/MainNav";
import InputBlock from "../input-block/InputBlock";

let links = [
  {
    name: "Wallet",
    link: "/wallet"
  }
];
const tableContent = [
  {
    date: "09/09/2017",
    service: "Advice",
    status: "Made",
    price: "100$"
  },
  {
    date: "10/12/2009",
    service: "Advice",
    status: "Made",
    price: "1000$"
  },
  {
    date: "30/02/2018",
    service: "Advice",
    status: "Pending",
    price: "990$"
  },
  {
    date: "26/06/2001",
    service: "Advice",
    status: "Made",
    price: "860$"
  },
  {
    date: "02/08/2014",
    service: "Advice",
    status: "Made",
    price: "690$"
  }
];

const Account = props => (
  <div className="wallet-page main-page wallet">
    <MainNav links={links} />
    <div className="hint">Balance</div>
    <section className="account-card wallet-card card">
      <div className="wallet-card__input-wrap">
        <InputBlock
          heading="Your Balance"
          type="text"
          appearing="no-events"
          value="$ 1423423452"
        />
      </div>
    </section>
    <section className="wallet__btns half-transparent">
      <button className="wallet__button">
        <div>
          <div className="wallet__button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              viewBox="0 0 266.514 266.514"
              width="15"
              height="15"
            >
              <path
                d="M133.257,266.514C59.775,266.514,0,206.733,0,133.257S59.775,0,133.257,0 s133.257,59.781,133.257,133.257S206.739,266.514,133.257,266.514z M133.257,10.878c-67.477,0-122.379,54.896-122.379,122.379 S65.78,255.636,133.257,255.636s122.379-54.896,122.379-122.379S200.734,10.878,133.257,10.878z"
                fill="#010002"
              />
              <path
                d="M210.35,127.818h-71.654V56.164c0-3.002-2.431-5.439-5.439-5.439c-3.008,0-5.439,2.437-5.439,5.439 v71.654H56.164c-3.002,0-5.439,2.437-5.439,5.439c0,3.002,2.437,5.439,5.439,5.439h71.654v71.649c0,3.002,2.431,5.439,5.439,5.439 c3.008,0,5.439-2.437,5.439-5.439v-71.649h71.654c3.002,0,5.439-2.437,5.439-5.439 C215.789,130.255,213.353,127.818,210.35,127.818z"
                fill="#010002"
              />
            </svg>
          </div>
          <span>To replenish the balance</span>
        </div>
      </button>
      <button className="wallet__button">
        <div>
          <div className="wallet__button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              viewBox="0 0 266.514 266.514"
              width="15"
              height="15"
            >
              <path
                d="M133.257,266.514C59.775,266.514,0,206.733,0,133.257S59.775,0,133.257,0 s133.257,59.781,133.257,133.257S206.739,266.514,133.257,266.514z M133.257,10.878c-67.477,0-122.379,54.896-122.379,122.379 S65.78,255.636,133.257,255.636s122.379-54.896,122.379-122.379S200.734,10.878,133.257,10.878z"
                fill="#010002"
              />
              <path
                d="M210.35,127.818h-71.654V56.164c0-3.002-2.431-5.439-5.439-5.439c-3.008,0-5.439,2.437-5.439,5.439 v71.654H56.164c-3.002,0-5.439,2.437-5.439,5.439c0,3.002,2.437,5.439,5.439,5.439h71.654v71.649c0,3.002,2.431,5.439,5.439,5.439 c3.008,0,5.439-2.437,5.439-5.439v-71.649h71.654c3.002,0,5.439-2.437,5.439-5.439 C215.789,130.255,213.353,127.818,210.35,127.818z"
                fill="#010002"
              />
            </svg>
          </div>
          <span>Создать заявку на вывод</span>
        </div>
      </button>
    </section>
    <section className="account-card wallet-table card half-transparent">
      <h3 className="wallet-table__title">
        The last transaction of your account
      </h3>

      <div className="wallet-table__content grid-table">
        <div className="grid-table__row grid-table__row_head">
          <div className="grid-table__cell grid-table__cell_head">Date</div>
          <div className="grid-table__cell grid-table__cell_head">Service</div>
          <div className="grid-table__cell grid-table__cell_head">Status</div>
          <div className="grid-table__cell grid-table__cell_head">Price</div>
        </div>
        {tableContent.map(item => {
          return (
            <div key={item.date + `-` + item.price} className="grid-table__row">
              <div className="grid-table__cell">{item.date}</div>
              <div className="grid-table__cell">{item.service}</div>
              <div className="grid-table__cell">{item.status}</div>
              <div className="grid-table__cell">{item.price}</div>
            </div>
          );
        })}
      </div>
    </section>
    <FooterNav />
  </div>
);

export default Account;

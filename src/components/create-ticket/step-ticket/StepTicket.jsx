import React from "react";

import InputBlock from "../../input-block/InputBlock";
import Btn from "../../buttons/Btn";
import Switch from "../../switch/Switch";

const consSwitches = [
  {
    text: "Диагностика",
    isActive: false
  },
  {
    text: "Рекомендации",
    isActive: false
  },
  {
    text: "Второе мнение",
    isActive: false
  }
];
const illSwitches = [
  {
    text: `Заболевания 
    сердца и сосудов`,
    isActive: false
  },
  {
    text: `Заболевания 
    легких`,
    isActive: false
  },
  {
    text: `Заболевания 
    почек`,
    isActive: false
  },
  {
    text: `Диабет`,
    isActive: false
  },
  {
    text: `Заболевания 
    крови`,
    isActive: false
  },
  {
    text: `Заболевания 
    глаз`,
    isActive: false
  },
  {
    text: `Венерические`,
    isActive: false
  },
  {
    text: `Заболевания 
    жкт`,
    isActive: false
  },
  {
    text: `Неврологические заболевания`,
    isActive: false
  },
  {
    text: `Заболевания 
    суставов`,
    isActive: false
  },
  {
    text: `Заболевания щитовидной железы`,
    isActive: false
  },
  {
    text: `Другие заболевания`,
    isActive: false
  }
];
const sportSwitches = [
  {
    text: `Низкие`,
    isActive: false
  },
  {
    text: `Средние`,
    isActive: false
  },
  {
    text: `Высокие`,
    isActive: false
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
const StepTicket = toggleSwitch => (
  <div className="create-ticket__step-ticket ticket-form">
    <div className="hint">Анкета пациента</div>
    <section className="account-card card">
      <div className="account-card__personal-info">
        <div className="account-card__inputs-wrap">
          <InputBlock
            heading="Имя"
            value="Артем"
            type="text"
            appearing=""
            placeholder=""
          />
          <InputBlock
            heading="Фамилия"
            value="Петровский"
            type="text"
            appearing=""
            placeholder=""
          />
        </div>
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Почта"
          value="test@gmail.com"
          type="email"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
        <InputBlock
          heading="Телефон"
          value="+39 099 99 9 9 99"
          type="tel"
          appearing=""
          placeholder=""
        />
        <InputBlock
          heading="Дата"
          value="26. 12. 1992"
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
        <InputBlock
          heading="Страна"
          value="Украина"
          type="text"
          appearing=""
          placeholder=""
        />
        <InputBlock
          heading="Язык"
          value="Украинский"
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="О себе"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="text"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>
      <div className="heading">Цель консультации</div>
      <div className="switches-block">
        {consSwitches.map((item, index) => (
          <Switch key={index} {...item} />
        ))}
      </div>
      <div className="heading">Аллергические реакции</div>
      <div className="switches-block">
        <Switch isActive={false} />
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Укажите на что…"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="text"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>
      <div className="heading">
        Ранее перенесеннные заболевания или актуальные заболевания:
      </div>
      <div className="switches-block">
        {illSwitches.map((item, index) => (
          <Switch
            key={index}
            {...item}
            //    onClick={() => toggleSwitch(index)}
          />
        ))}
      </div>
      <div className="heading">Курение</div>
      <div className="switches-block">
        <Switch isActive={false} />
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Укажите на что…"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="text"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>

      <div className="heading">Aлкоголь</div>
      <div className="switches-block">
        <Switch isActive={false} />
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Укажите на что…"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="text"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>

      <div className="heading">Физические упражнения</div>
      <div className="switches-block">
        {sportSwitches.map((item, index) => (
          <Switch
            key={index}
            {...item}
            //    onClick={() => toggleSwitch(index)}
          />
        ))}
      </div>
      <div className="account-card__inputs-wrap account-card__inputs-wrap_horizontal">
        <InputBlock
          heading="Укажите ваш вес"
          value=""
          type="text"
          appearing=""
          placeholder=""
        />
        <InputBlock
          heading="Укажите ваш рост"
          value=""
          type="text"
          appearing=""
          placeholder=""
        />
      </div>
      <div className="heading">
        Ранее перенесенные операции или заболевания требующие госпитализации
      </div>

      <div className="wallet-table__content grid-table">
        <div className="grid-table__row grid-table__row_head">
          <div className="grid-table__cell grid-table__cell_head">Date</div>
          <div className="grid-table__cell grid-table__cell_head">Service</div>
          <div className="grid-table__cell grid-table__cell_head">Status</div>
          <div className="grid-table__cell grid-table__cell_head">Price</div>
        </div>
        {tableContent.map(item => {
          return (
            <div className="grid-table__row">
              <div className="grid-table__cell">{item.date}</div>
              <div className="grid-table__cell">{item.service}</div>
              <div className="grid-table__cell">{item.status}</div>
              <div className="grid-table__cell">{item.price}</div>
            </div>
          );
        })}
      </div>
      <div className="account-card__inputs-wrap">
        <InputBlock
          heading="Укажите на что…"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="text"
          appearing="input-block__dashed-border"
          placeholder=""
        />
      </div>
      <Btn text={"отправить"} appearing={"btn_small btn_blue"} />
    </section>
  </div>
);

export default StepTicket;

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

const switchesInitialState = {
  consSwitches,
  illSwitches,
  sportSwitches
};

export default function switches(state = switchesInitialState, action) {
  switch (action.type) {
    case "TOGGLE_SWITCH":
      return Object.assign({}, state, {
        [action.arrType]: state[action.arrType].map((item, index) => {
          if (index === action.id) {
            return Object.assign({}, item, {
              isActive: !item.isActive
            });
          }
          return item;
        })
      });
    default:
      return state;
  }
}

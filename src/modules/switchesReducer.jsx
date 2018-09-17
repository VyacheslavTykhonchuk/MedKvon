const consSwitches = [
  {
    text: 'Diagnosis,',
    isActive: false,
    name: 'diagnostics',
  },
  {
    text: 'Recommendation',
    isActive: false,
    name: 'recommendations',
  },
  {
    text: 'Second opinion',
    isActive: false,
    name: 'second_opinion',
  },
];
const illSwitches = [
  {
    text: `Diseases of the heart and blood vessels`,
    isActive: false,
    name: 'heart_diseases',
  },
  {
    text: `Diseases of the digestive tract`,
    isActive: false,
    name: 'stomach_diseases',
  },
  {
    text: `Lung disease`,
    isActive: false,
    name: 'lung_diseases',
  },
  {
    text: `Neurological diseases`,
    isActive: false,
    name: 'neurological_diseases',
  },
  {
    text: `Kidney diseases`,
    isActive: false,
    name: 'kidney_diseases',
  },
  {
    text: `Diseases of the joints`,
    isActive: false,
    name: 'joints_diseases',
  },
  {
    text: `Diabetes`,
    isActive: false,
    name: 'diabetes_diseases',
  },
  {
    text: `Thyroid gland diseases`,
    isActive: false,
    name: 'thyroid_diseases',
  },
  {
    text: `Diseases of the blood`,
    isActive: false,
    name: 'blood_diseases',
  },
  {
    text: `Eye diseases`,
    isActive: false,
    name: 'eye_diseases',
  },
  {
    text: `Other diseases`,
    isActive: false,
    name: 'other_diseases',
  },
];
const sportSwitches = [
  {
    text: `Low`,
    isActive: false,
    name: 'physical_exercises',
    val: 'low',
  },
  {
    text: `Medium`,
    isActive: false,
    name: 'physical_exercises',
    val: 'medium',
  },
  {
    text: `High`,
    isActive: false,
    name: 'physical_exercises',
    val: 'high',
  },
];

const switchesInitialState = {
  consSwitches,
  illSwitches,
  sportSwitches,
};

export default function switches(state = switchesInitialState, action) {
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return Object.assign({}, state, {
        [action.arrType]: state[action.arrType].map((item, index) => {
          if (index === action.id) {
            return Object.assign({}, item, {
              isActive: !item.isActive,
            });
          }
          return item;
        }),
      });
    default:
      return state;
  }
}

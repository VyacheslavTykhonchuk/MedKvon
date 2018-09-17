import React from 'react';
import { connect } from 'react-redux';

import Btn from '../../buttons/Btn';
import DoctorNameCard from '../../doctor-name-card/DoctorNameCard';
// import CustomSelect from '../../select/CustomSelect';
import Preloader from '../../preloader/Preloader';

import { setDoctorsIdsStr } from '../../../modules/formModule';

// const selectOptions = [
//   {
//     val: 'Step One',
//   },
//   {
//     val: 'Step Two',
//   },
//   {
//     val: 'Step Three',
//   },
// ];
const mapStateToProps = (state) => ({
  docs: state.formData.doctorNames,
});
const mapDispatchToProps = {
  setDoctorsIdsStr,
};
class StepDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsIDs: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.docs !== undefined) {
      const items = Object.keys(nextProps.docs).map(
        (key) => nextProps.docs[key]
      );
      return { items };
    } else {
      return null;
    }
  }

  itemCheck = (id) => {
    const arr = this.state.doctorsIDs;
    if (this.isChecked(id)) {
      const index = arr.indexOf(id);
      arr.splice(index, 1);
      this.setState({
        doctorsIDs: arr,
      });
    } else {
      arr.push(id);
      this.setState({
        doctorsIDs: arr,
      });
    }

    const DOCS_STR = arr.join(',');
    this.props.setDoctorsIdsStr(DOCS_STR);
  };
  isChecked = (id) => {
    const arr = this.state.doctorsIDs;
    return arr.find(function(element) {
      return element === id;
    });
  };
  render() {
    return (
      <div className="create-ticket__step-two create-ticket__step-doctors">
        {/* <CustomSelect selected="Step Three" options={selectOptions} /> */}
        {this.state.items === undefined ? (
          <Preloader />
        ) : (
          <div className="create-ticket__cards">
            {this.state.items.map((item) => (
              <DoctorNameCard
                key={item.id}
                id={item.id}
                name={item.firstname}
                lastName={item.lastname}
                rating={item.rating}
                about={item.about}
                avatar={item.avatar}
                onCheck={() => this.itemCheck(item.id)}
                checked={this.isChecked(item.id)}
              />
            ))}
            <Btn
              text={'Proceed'}
              linkTo="/create-ticket/ticket"
              action={this.handleSubmit}
              appearing={
                this.state.doctorsIDs.length > 0
                  ? 'btn_small btn_blue '
                  : 'btn_small btn_blue disabled'
              }
            />
          </div>
        )}

        <div />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepDoctors);

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showNotification } from "../../actions/notificationActions";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }
  componentWillReceiveProps() {
    this.setState({
      isVisible: true
    });
    setTimeout(() => {
      this.setState({
        isVisible: false
      });
    }, 1000);
  }
  render() {
    return (
      <div
        className={
          this.state.isVisible
            ? "notification-container notification-container_visible"
            : "notification-container notification-container_hidden"
        }
      >
        <div
          className={
            this.props.notification.style
              ? "notification " + this.props.notification.style
              : "notification"
          }
        >
          <div className="notification__text">
            {this.props.notification.message}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        showNotification
      },
      dispatch
    )
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

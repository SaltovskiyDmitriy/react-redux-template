import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { getNotification } from '../../utils/index';

class SecondComponent extends React.Component {
  render() {
    return (
      <div>
        <button
          style={ { display: 'block', margin: '0 auto' } }
          onClick={ () => this.props.viewValidationWarnings('Hey I am a waring') }
        >
          Show Notification
        </button>
      </div>
    );
  }
}

SecondComponent.propTypes = {
  viewValidationWarnings: PropTypes.func
};

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    viewValidationWarnings: warning => {
      const notification = getNotification('warning', warning);
      dispatch(Notifications.warning(notification));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondComponent);
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';

class NotificationsShell extends Component {
  render() {
    const { notifications } = this.props;
    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px',
        },
      },
    };
    return (
      <Fragment>
        { this.props.children }
        <Notifications
          notifications={ notifications }
          style={ style }
        />
      </Fragment>
    );
  }
}

const stateToProps = state => ({
  notifications: state.notifications,
});

NotificationsShell.propTypes = {
  notifications: PropTypes.array,
  children: PropTypes.any
};

export default connect(stateToProps)(NotificationsShell);
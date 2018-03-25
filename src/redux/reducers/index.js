import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import firstSomeReducer from './firstSomeReducer';
import secondSomeReducer from './secondSomeReducer';

export default combineReducers({
  firstSomeReducer,
  secondSomeReducer,
  notifications
});
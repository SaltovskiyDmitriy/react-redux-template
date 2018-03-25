import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducers from '../reducers'; // eslint-disable-line

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// eslint-disable-line


const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

export default store;
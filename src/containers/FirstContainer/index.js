import React, { Component, Fragment } from 'react';
import authHOC from '../authHoc';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';

class Container extends Component {
  render() {
    return (
      <Fragment>
        <FirstComponent />
        <SecondComponent />
      </Fragment>
    );
  }
}

export default authHOC(Container);
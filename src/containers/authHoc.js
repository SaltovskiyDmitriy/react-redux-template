import React from 'react';

export default (ChildComponent) => {
  return class authHoc extends React.Component {
    auth() {
      return true;
    }
    noName() {
      return (
        <div className='no-name-wrap' />
      );
    }

    render() {
      return (
        this.auth() ? <ChildComponent /> : this.noName()
      );
    }
  };
};
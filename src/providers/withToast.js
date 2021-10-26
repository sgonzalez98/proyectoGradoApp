/* eslint-disable class-methods-use-this */
import React from 'react';
import Toast from 'react-native-toast-message';

const CONFIG_TOAST = {
  // position: 'top',
  // visibilityTime: 4000,
  // autoHide: true,
  // topOffset: 30,
  // bottomOffset: 40,
};

export default (WrappedComponent) => class extends React.PureComponent {
  appSuccess = (message = '') => {
    Toast.show({ text1: message, text2: message, type: 'success', ...CONFIG_TOAST });
  };

  appError = (message = '') => {
    Toast.show({ text1: message, text2: message, type: 'error', ...CONFIG_TOAST });
  };

  appInfo = (message = '') => {
    Toast.show({ text1: message, text2: message, type: 'info', ...CONFIG_TOAST });
  };

  render() {
    return (
      <WrappedComponent
        appSuccess={this.appSuccess}
        appError={this.appError}
        appInfo={this.appInfo}
        {...this.props}
      />
    );
  }
};

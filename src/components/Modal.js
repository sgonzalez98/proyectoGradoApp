import React from 'react';
import RNModal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  modalBackground: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
});

function Modal({ visible, children, closeFunction }) {
  return (
    <RNModal
      isVisible={visible}
      onBackdropPress={closeFunction}
      backdropOpacity={0.5}
      style={styles.modalBackground}
    >
      <View style={styles.activityIndicatorWrapper}>{children}</View>
    </RNModal>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  closeFunction: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  closeFunction: null,
};

export default Modal;

import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import RNModal from 'react-native-modal';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  textWrapper: {
    padding: 10,
    alignItems: 'center',
  },
  buttonsWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.1,
  },
});

export default function confirmModal({
  title, description, onAccept, onCancel, labelAccept, labelCancel,
}) {
  return (
    <RNModal
      isVisible
      onBackdropPress={onCancel}
      backdropOpacity={0.5}
      style={styles.modalBackground}
    >
      <View style={styles.activityIndicatorWrapper}>
        <View style={styles.textWrapper}>
          <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 15 }}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            transparent
            onPress={onCancel}
            style={[{ borderBottomLeftRadius: 2 }, styles.button]}
          >
            <Text style={{ fontWeight: 'bold' }}>{labelCancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            onPress={onAccept}
            style={[{ borderBottomRightRadius: 2 }, styles.button]}
          >
            <Text style={{ fontWeight: 'bold' }}>{labelAccept}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
}

confirmModal.defaultProps = {
  description: '',
  labelAccept: 'SI',
  labelCancel: 'NO',
};

confirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  labelAccept: PropTypes.string,
  labelCancel: PropTypes.string,
};

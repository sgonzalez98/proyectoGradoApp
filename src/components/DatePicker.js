import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});

function DatePickerComponent(props) {
  const [showModal, setShowModal] = useState(false);
  const {
    field: { name, value },
    form: { touched, errors, setFieldValue },
    label,
    style,
    ...otheProps
  } = props;
  const hasError = touched[name] && Boolean(errors[name]);
  const borderColor = hasError ? 'red' : 'black';
  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor }, style]}
        onPress={() => setShowModal(true)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="calendar" style={{ fontSize: 25, marginRight: 8 }} />
          <Text>{label}</Text>
        </View>
        <Text>{ value ? moment(value).format('YYYY-MM-DD h:mm A') : ''}</Text>
      </TouchableOpacity>
      <DatePicker
        date={value}
        locale="es"
        modal
        title="Seleccionar una fecha"
        confirmText="Confirmar"
        cancelText="Cancelar"
        androidVariant="iosClone"
        open={showModal}
        minuteInterval={5}
        onConfirm={(newDate) => {
          setShowModal(false);
          setFieldValue(name, newDate);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
        {...otheProps}
      />
    </>
  );
}

DatePickerComponent.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
};

DatePickerComponent.defaultProps = {
  style: {},
};

export default DatePickerComponent;

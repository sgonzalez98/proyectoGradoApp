import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

function DatePickerComponent({ label }) {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="calendar" style={{ fontSize: 25, marginRight: 8 }} />
          <Text>{label}</Text>
        </View>
        <Text>{moment(date).format('YYYY-MM-DD h:mm:ss A')}</Text>
      </TouchableOpacity>
      <DatePicker
        date={date}
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
          setDate(newDate);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}

DatePickerComponent.propTypes = {
  label: PropTypes.string.isRequired,
};

DatePickerComponent.defaultProps = {
};

export default DatePickerComponent;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 0.5,
    borderRadius: 8,
    height: 40,
  },
  textError: {
    color: '#ed2f2f',
    fontSize: 12,
    marginLeft: 5,
  },
});

function PickerComponent({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  items,
  style,
  ...props
}) {
  const hasError = touched[name] && Boolean(errors[name]);
  const onValueChange = (selectValue) => {
    setFieldValue(name, selectValue);
  };
  return (
    <View style={style}>
      <View style={[styles.pickerWrapper, { borderColor: hasError ? 'red' : '#D9D5DC' }]}>
        <Picker
          mode="dropdown"
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ top: -8 }}
          {...props}
        >
          <Picker.Item label={label} value="" />
          {items.map((row, index) => (
            <Picker.Item key={String(index)} label={row.label} value={row.value} />
          ))}
        </Picker>
      </View>
      {hasError && <Text style={styles.textError}>{errors[name]}</Text>}
    </View>
  );
}

PickerComponent.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
};

PickerComponent.defaultProps = {
  style: {},
};

export default PickerComponent;

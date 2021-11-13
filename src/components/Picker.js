import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  errorIcon: {
    // color: colors.inputErrorBorderColor,
    fontSize: 25,
    marginBottom: 7,
  },
  textLabel: {
    fontSize: 15,
    color: '#575757',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

function PickerComponent({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  label,
  items,
  ...props
}) {
  const hasError = touched[name] && Boolean(errors[name]);
  const onValueChange = (selectValue) => {
    setFieldValue(name, selectValue);
  };
  const pickerWrapper = {
    marginTop: 5,
    borderBottomWidth: 0.66,
    // borderBottomColor: hasError ? colors.inputErrorBorderColor : '#D9D5DC',
  };
  return (
    <View style={pickerWrapper}>
      <Text style={styles.textLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Picker
          mode="dropdown"
          selectedValue={value}
          onValueChange={onValueChange}
          itemStyle={{ fontSize: 30 }}
          itemTextStyle={{ fontSize: 30 }}
          {...props}
        >
          <Picker.Item
            key="nullItem"
            label="Seleccione un registro"
            value={null}
          />
          {items.map((row, index) => (
            <Picker.Item
              key={String(index)}
              label={row.label}
              value={row.value}
            />
          ))}
        </Picker>
        {/* {hasError && <Icon name="close-circle" style={styles.errorIcon} />} */}
      </View>
    </View>
  );
}

PickerComponent.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PickerComponent;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableOpacity as Touchable, View, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  button: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraIcon: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const NumericBase = ({
  field: {
    name, value, onBlur, onChange,
  },
  form: { touched, errors, setFieldValue },
  maxValue,
  label,
  showExtraButton,
  ...props
}) => {
  const hasError = touched[name] && Boolean(errors[name]);
  const number = (num) => {
    if (num < 0) {
      return 0;
    }
    if (maxValue && num > maxValue) {
      return maxValue;
    }
    return num;
  };
  const substract = (increment) => {
    setFieldValue(name, number(parseInt(value || 0, 10) - increment));
  };
  const add = (increment) => {
    setFieldValue(name, number(parseInt(value || 0, 10) + increment));
  };
  return (
    <View>
      <Text>{label}</Text>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        {showExtraButton && (
          <Touchable style={[styles.button, { marginRight: 10 }]} onPress={() => substract(10)}>
            <Text style={styles.extraIcon}>-10</Text>
          </Touchable>
        )}
        <Touchable style={styles.button} onPress={() => substract(1)}>
          <Text style={styles.icon}>-</Text>
        </Touchable>
        <TextInput
          name={name}
          value={String(value)}
          onBlur={(event) => onBlur(name)(event)}
          onChangeText={(event) => onChange(name)(event)}
          editable={false}
          textAlign="center"
          {...props}
          style={{ flex: 1, color: 'black' }}
        />
        {hasError && <Icon name="close-circle" />}
        <Touchable style={styles.button} onPress={() => add(1)}>
          <Text style={styles.icon}>+</Text>
        </Touchable>
        {showExtraButton && (
          <Touchable style={[styles.button, { marginLeft: 10 }]} onPress={() => add(10)}>
            <Text style={styles.extraIcon}>+10</Text>
          </Touchable>
        )}
      </View>
    </View>
  );
};

NumericBase.propTypes = {
  field: PropTypes.oneOfType([PropTypes.object]).isRequired,
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
  maxValue: PropTypes.number,
  showExtraButton: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

NumericBase.defaultProps = {
  maxValue: null,
  showExtraButton: false,
};

export default NumericBase;

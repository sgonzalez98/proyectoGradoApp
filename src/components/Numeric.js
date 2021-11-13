import React from 'react';
import {
  Item, Input, Icon, Button,
} from 'native-base';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const Numeric = ({
  field: {
    name, value, onBlur, onChange,
  },
  form: { touched, errors, setFieldValue },
  maxValue,
  label,
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
  return (
    <>
      <Text>{label}</Text>
      <Item error={hasError}>
        <Button
          bordered
          style={{ borderRadius: 8 }}
          onPress={() => setFieldValue(name, number(parseInt(value || 0, 10) - 1))}
        >
          <Icon name="remove" style={{ fontSize: 15 }} />
        </Button>
        <Input
          name={name}
          value={String(value)}
          autoCompleteType="off"
          keyboardType="numeric"
          onBlur={(event) => onBlur(name)(event)}
          onChangeText={(event) => onChange(name)(event)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          showSoftInputOnFocus={false}
          {...props}
        />
        {hasError && <Icon name="close-circle" />}
        <Button
          bordered
          style={{ borderRadius: 8 }}
          onPress={() => setFieldValue(name, number(parseInt(value || 0, 10) + 1))}
        >
          <Icon name="add" style={{ fontSize: 15 }} />
        </Button>
      </Item>
    </>
  );
};

export default Numeric;

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
  },
});

const colors = {
  success: '#5cb85c',
  warning: '#f0ad4e',
  disabled: '#b5b5b5',
};

export default function Button({
  iconName, text, color, type, onPress, disabled, style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: !disabled ? colors[type] : colors.disabled, ...style },
      ]}
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled}
    >
      {iconName && <Icon name={iconName} style={[styles.icon, { color }]} />}
      <Text style={{ color, fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object]),
};

Button.defaultProps = {
  iconName: null,
  type: 'success',
  color: 'white',
  disabled: false,
  style: {},
};
